import mercurius from "mercurius";
import argon2 from "argon2";
import { extendType, nonNull } from "nexus";
import { LoginInput, RegisterInput } from "../types/User.js";

const { ErrorWithProps } = mercurius;

export const register = extendType({
    type: "Mutation",
    definition(t) {
        t.field("register", {
            type: "Boolean",
            args: {
                data: nonNull(RegisterInput)
            },
            resolve: async (_, args, ctx): Promise<boolean> => {
                // TODO: validate input
                if (args.data.password !== args.data.confirmPassword) {
                    throw new ErrorWithProps("Passwords do not match");
                }
                const {
                    ["confirmPassword"]: confirmPassword,
                    ...userWithoutConfirmPassword
                } = args.data;

                // insert user record
                try {
                    const hashedPassword = await argon2.hash(
                        args.data.password
                    );
                    await ctx.prisma.user.create({
                        data: {
                            ...userWithoutConfirmPassword,
                            email: args.data.email.toLowerCase(),
                            password: hashedPassword
                        }
                    });
                    return true;
                } catch (error) {
                    return false;
                }
            }
        });
    }
});

export const login = extendType({
    type: "Mutation",
    definition(t) {
        t.field("login", {
            type: "Boolean",
            args: {
                data: nonNull(LoginInput)
            },
            resolve: async (_, args, ctx): Promise<boolean> => {
                try {
                    const userByEmail = await ctx.prisma.user.findUnique({
                        where: {
                            email: args.data.email.toLowerCase()
                        }
                    });
                    if (!userByEmail) {
                        throw new ErrorWithProps("Account not found");
                    }

                    const isValidPassword = await argon2.verify(
                        userByEmail.password,
                        args.data.password
                    );
                    if (!isValidPassword) {
                        throw new ErrorWithProps("Invalid login");
                    }

                    // TODO: create session, set cookies
                    return true;
                } catch (error) {
                    return false;
                }
            }
        });
    }
});
