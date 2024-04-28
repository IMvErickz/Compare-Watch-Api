import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function getUserId(app: FastifyInstance) {
    app.get('/user/:id', async (request) => {

        const userSchema = z.object({
            id: z.string(),
        })

        const { id } = userSchema.parse(request.params)

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            }
        })

        return user
    })
}