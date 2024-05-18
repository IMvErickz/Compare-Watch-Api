import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { authenticate } from "../../plugins/authenticate";
import { UserT } from "../../types/user";

export async function Fav(app: FastifyInstance) {
  app.put("/fav", { onRequest: [authenticate] }, async (request, reply) => {
    const userSchema = z.object({
      fav: z.string(),
    });

    const { fav } = userSchema.parse(request.body);

    // @ts-ignore
    const user: UserT = request.user;

    if (!user) {
      reply.status(401).send("You need sign up to favorite this watch!");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favs: {
          connect: {
            id: fav,
          },
        },
      },
    });

    return reply.status(201).send("sucess");
  });
}
