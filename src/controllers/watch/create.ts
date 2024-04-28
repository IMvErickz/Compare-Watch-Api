import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function CreateWatch(app: FastifyInstance) {
    app.post('/watch/:brandId', async (request, response) => {

        const brandSchema = z.object({
            brandId: z.string()
        })

        const { brandId } = brandSchema.parse(request.params)

        const WatchSchema = z.object({
            name: z.string(),
            price: z.number(),
            description: z.string(),
            link: z.string().url(),
            boxMaterial: z.string(),
            boxSize: z.string(),
            braceletMaterial: z.string(),
            dialColor: z.string(),
            movimentType: z.string(),
            picture: z.array(z.string()),
            releaseYear: z.number(),
            extras: z.string(),
            originCountry: z.string(),
        });
        
        const {
            name,
            price,
            description,
            link,
            boxMaterial,
            boxSize,
            braceletMaterial,
            dialColor,
            movimentType,
            picture,
            releaseYear,
            extras,
            originCountry,
        } = WatchSchema.parse(request.body)

        await prisma.watch.create({
            data: {
                name,
                price,
                description,
                link,
                boxMaterial,
                boxSize,
                braceletMaterial,
                dialColor,
                movimentType,
                picture,
                releaseYear,
                extras,
                originCountry,
                brandId
            }
        })

        return response.status(201).send('success')
    })
}