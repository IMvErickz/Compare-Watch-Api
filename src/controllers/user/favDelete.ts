import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { authenticate } from "../../plugins/authenticate";
import { UserT } from "../../types/user";

export async function FavDelete(app: FastifyInstance) {
  app.delete(
    "/favs/delete/:id",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const userSchema = z.object({
        id: z.string(),
      });

      const { id: fav } = userSchema.parse(request.params);

      // @ts-ignore
      const user: UserT = request.user;

      if (!user) {
        reply.status(401).send("You need sign up to unfavorite this watch!");
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favs: {
            disconnect: {
              id: fav
            }
          }
        }
      });

      return reply.status(201).send("sucess");
    }
  );
}
