import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllWatches(app: FastifyInstance) {
    app.get('/watch', async () => {
        const watches = await prisma.watch.findMany({
            include: {
                Brand: {
                    select: {
                        id: true,
                        description: true,
                        name: true,
                        watch: true,
                    }
                }
            }
        })

        return watches
    })
}