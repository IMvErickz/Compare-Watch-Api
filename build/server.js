"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/user/create.ts
var import_zod = require("zod");
var import_bcrypt = __toESM(require("bcrypt"));
async function CreateUser(app2) {
  app2.post("/user", async (request, response) => {
    const userSchema = import_zod.z.object({
      name: import_zod.z.string(),
      email: import_zod.z.string(),
      password: import_zod.z.string()
    });
    const { email, name, password } = userSchema.parse(request.body);
    import_bcrypt.default.hash(password, 10, async function(err, hash) {
      await prisma.user.create({
        data: {
          email,
          name,
          password: hash
        }
      });
    });
    return response.status(201).send("sucess");
  });
}

// src/controllers/user/getUserId.ts
var import_zod2 = require("zod");
async function getUserId(app2) {
  app2.get("/user/:id", async (request) => {
    const userSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = userSchema.parse(request.params);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    return user;
  });
}

// src/controllers/watch/create.ts
var import_zod3 = require("zod");
async function CreateWatch(app2) {
  app2.post("/watch/:brandId", async (request, response) => {
    const brandSchema = import_zod3.z.object({
      brandId: import_zod3.z.string()
    });
    const { brandId } = brandSchema.parse(request.params);
    const WatchSchema = import_zod3.z.object({
      name: import_zod3.z.string(),
      price: import_zod3.z.number(),
      description: import_zod3.z.string(),
      link: import_zod3.z.string().url(),
      boxMaterial: import_zod3.z.string(),
      boxSize: import_zod3.z.string(),
      braceletMaterial: import_zod3.z.string(),
      dialColor: import_zod3.z.string(),
      movimentType: import_zod3.z.string(),
      picture: import_zod3.z.array(import_zod3.z.string()),
      releaseYear: import_zod3.z.number(),
      extras: import_zod3.z.string(),
      originCountry: import_zod3.z.string()
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
      originCountry
    } = WatchSchema.parse(request.body);
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
    });
    return response.status(201).send("success");
  });
}

// src/controllers/watch/getAllWatches.ts
async function getAllWatches(app2) {
  app2.get("/watch", async () => {
    const watches = await prisma.watch.findMany({
      include: {
        Brand: {
          select: {
            id: true,
            description: true,
            name: true,
            watch: true
          }
        }
      }
    });
    return watches;
  });
}

// src/controllers/watch/getWatchId.ts
var import_zod4 = require("zod");
async function GetWatchId(app2) {
  app2.get("/watch/:id", async (request) => {
    const watchSchema = import_zod4.z.object({
      id: import_zod4.z.string()
    });
    const { id } = watchSchema.parse(request.params);
    const watch = await prisma.watch.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        Brand: {
          select: {
            description: true,
            name: true,
            id: true
          }
        }
      }
    });
    return watch;
  });
}

// src/controllers/brand/getAllBrand.ts
async function GetAllBrand(app2) {
  app2.get("/brand", async () => {
    const brand = await prisma.brand.findMany();
    return brand;
  });
}

// src/controllers/brand/getBrandId.ts
var import_zod5 = require("zod");
async function GetBrandId(app2) {
  app2.get("/brand/:id", async (request) => {
    const brandSchema = import_zod5.z.object({
      id: import_zod5.z.string()
    });
    const { id } = brandSchema.parse(request.params);
    const brand = await prisma.brand.findUniqueOrThrow({
      where: {
        id
      }
    });
    return brand;
  });
}

// src/controllers/user/auth.ts
var import_zod6 = require("zod");
var import_bcrypt2 = __toESM(require("bcrypt"));
async function auth(fastify) {
  fastify.post("/auth", async (request, reply) => {
    const createUserBody = import_zod6.z.object({
      email: import_zod6.z.string().email("Email ou senha invalidos"),
      password: import_zod6.z.string()
    });
    const { email, password } = createUserBody.parse(request.body);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
    const hash = import_bcrypt2.default.compareSync(password, user.password);
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

// src/server.ts
var import_jwt = __toESM(require("@fastify/jwt"));

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod7 = require("zod");
var envSchema = import_zod7.z.object({
  DATABASE_URL: import_zod7.z.string(),
  POSTGRES_USER: import_zod7.z.string(),
  POSTGRES_PASSWORD: import_zod7.z.string(),
  POSTGRES_DATABASE: import_zod7.z.string(),
  NODE_ENV: import_zod7.z.enum(["develop", "test", "production"]).default("develop"),
  PORT: import_zod7.z.coerce.number().default(3333),
  SECRET: import_zod7.z.string().default("compareWatchAPISecret")
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.log("\u274C Invalid environmant variables", _env.error.format());
  throw new Error("Invalid environmant variables");
}
var env = _env.data;

// src/server.ts
var app = (0, import_fastify.default)({
  logger: true
});
app.register(import_cors.default, {
  origin: true
});
app.register(import_jwt.default, {
  secret: env.SECRET
});
app.register(CreateUser);
app.register(getUserId);
app.register(auth);
app.register(CreateWatch);
app.register(getAllWatches);
app.register(GetWatchId);
app.register(GetAllBrand);
app.register(GetBrandId);
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => console.log("\u{1F680}\u{1F680}\u{1F680} Server is running"));
