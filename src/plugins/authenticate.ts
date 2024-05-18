import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

interface responseUserT {
  name: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export async function authenticate(request: FastifyRequest) {
  const { sub }: responseUserT = await request.jwtVerify();

  request.user =
    (await prisma.user.findUnique({
      where: {
        id: sub,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      }
    })) || {};
}
