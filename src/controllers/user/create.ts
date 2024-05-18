import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function CreateUser(app: FastifyInstance) {
  app.post("/user", async (request, reply) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { email, name, password } = userSchema.parse(request.body);

    bcrypt.hash(password, 10, async function (err, hash) {
      await prisma.user.create({
        data: {
          email,
          name,
          password: hash,
        },
      });
    });

    return reply.status(201).send("sucess");
  });
}
