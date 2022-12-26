import { extendType, stringArg, nonNull } from "nexus";
import { prisma } from "../../../utils/prisma.js";
import type { NexusGenObjects } from "../generated/nexus-typegen.cjs";
import { User, UserInput } from "../types/User.js";

type IUser = NexusGenObjects["User"];

export const userById = extendType({
    type: "Query",
    definition(t) {
        t.field("userById", {
            type: User,
            args: {
                id: nonNull(stringArg())
            },
            resolve: async (_, args, ctx): Promise<IUser | null> => {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: args.id
                    }
                });
            }
        });
    }
});

export const createUser = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createUser", {
            type: User,
            args: { data: nonNull(UserInput) },
            resolve: async (_, args, _ctx): Promise<IUser | null> => {
                try {
                    const user = await prisma.user.create({
                        data: {
                            ...args.data
                        }
                    });
                    return user;
                } catch (error) {
                    return null;
                }
            }
        });
    }
});
