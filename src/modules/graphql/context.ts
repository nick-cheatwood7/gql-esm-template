import { prisma } from "../../utils/prisma.js";
import type { FastifyRequest, FastifyReply } from "fastify";

export interface IContext {
    req: FastifyRequest;
    reply: FastifyReply;
    prisma: typeof prisma;
}

export async function buildContext(
    req: FastifyRequest,
    reply: FastifyReply
): Promise<IContext> {
    console.log("Building context...");
    return {
        req,
        reply,
        prisma
    };
}
