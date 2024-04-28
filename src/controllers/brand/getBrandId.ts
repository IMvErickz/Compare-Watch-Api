import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function GetBrandId(app: FastifyInstance) {
    app.get('/brand/:id', async (request) => {

        const brandSchema = z.object({
            id: z.string()
        })

        const {id} = brandSchema.parse(request.params)

        const brand = await prisma.brand.findUniqueOrThrow({
            where: {
                id
            }
        })

        return brand
    })
}