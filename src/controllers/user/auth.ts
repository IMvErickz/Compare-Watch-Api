import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { authenticate } from "../../plugins/authenticate";


export async function auth(fastify: FastifyInstance) {
  fastify.post('/auth', async (request) => {
    const createUserBody = z.object({
      email: z.string().email('Email ou senha invalidos'),
      password: z.string()
    })

    const { email, password } = createUserBody.parse(request.body)

  })
}