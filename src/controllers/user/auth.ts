import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { authenticate } from "../../plugins/authenticate";
import bcrypt from 'bcrypt'


export async function auth(fastify: FastifyInstance) {
  fastify.post('/auth', async (request, reply) => {
    const createUserBody = z.object({
      email: z.string().email('Email ou senha invalidos'),
      password: z.string()
    })

    const { email, password } = createUserBody.parse(request.body)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    })

    const hash = bcrypt.compareSync(password, user.password)

    if (hash) {
      const token = fastify.jwt.sign({
        name: user.name,
        email: user.email
      }, {
        sub: user.id,
        expiresIn: '7 days'
      })

      return reply.status(200).send(`Bearer ${token}`)
    }

  })
}