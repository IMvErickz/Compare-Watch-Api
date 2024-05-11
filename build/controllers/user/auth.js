"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/user/auth.ts
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth
});
module.exports = __toCommonJS(auth_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/user/auth.ts
var import_bcrypt = __toESM(require("bcrypt"));
async function auth(fastify) {
  fastify.post("/auth", async (request, reply) => {
    const createUserBody = import_zod.z.object({
      email: import_zod.z.string().email("Email ou senha invalidos"),
      password: import_zod.z.string()
    });
    const { email, password } = createUserBody.parse(request.body);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
    const hash = import_bcrypt.default.compareSync(password, user.password);
    if (hash) {
      const token = fastify.jwt.sign({
        name: user.name,
        email: user.email
      }, {
        sub: user.id,
        expiresIn: "7 days"
      });
      return reply.status(200).send(`Bearer ${token}`);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth
});
