import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetAllBrand(app: FastifyInstance) {
    app.get('/brand', async () => {
        const brand = await prisma.brand.findMany()

        return brand
    })
}