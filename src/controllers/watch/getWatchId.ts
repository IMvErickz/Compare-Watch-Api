import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function GetWatchId(app: FastifyInstance) {
    app.get('/watch/:id', async (request) => {

        const watchSchema = z.object({
            id: z.string()
        })

        const { id } = watchSchema.parse(request.params)

        const watch = await prisma.watch.findUniqueOrThrow({
            where: {
                id
            },
            include: {
                Brand: {
                    select: {
                        description: true,
                        name: true,
                        id: true,
                    }
                }
            }
        })

        return watch
    })
}