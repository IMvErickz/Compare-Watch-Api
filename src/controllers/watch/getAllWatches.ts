import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllWatches(app: FastifyInstance) {
    app.get('/watch', async () => {
        const watches = await prisma.watch.findMany()

        return watches
    })
}