import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function CreateUser(app: FastifyInstance) {
    app.post('/user', async (request, response) => {

        const userSchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string()
        })

        const {email,name,password} = userSchema.parse(request.body)

        await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })

        return response.status(201).send('sucess')
    })
}