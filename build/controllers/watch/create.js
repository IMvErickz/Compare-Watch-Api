"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/watch/create.ts
var create_exports = {};
__export(create_exports, {
  CreateWatch: () => CreateWatch
});
module.exports = __toCommonJS(create_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/watch/create.ts
var import_zod = require("zod");
async function CreateWatch(app) {
  app.post("/watch/:brandId", async (request, response) => {
    const brandSchema = import_zod.z.object({
      brandId: import_zod.z.string()
    });
    const { brandId } = brandSchema.parse(request.params);
    const WatchSchema = import_zod.z.object({
      name: import_zod.z.string(),
      price: import_zod.z.number(),
      description: import_zod.z.string(),
      link: import_zod.z.string().url(),
      boxMaterial: import_zod.z.string(),
      boxSize: import_zod.z.string(),
      braceletMaterial: import_zod.z.string(),
      dialColor: import_zod.z.string(),
      movimentType: import_zod.z.string(),
      picture: import_zod.z.array(import_zod.z.string()),
      releaseYear: import_zod.z.number(),
      extras: import_zod.z.string(),
      originCountry: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateWatch
});
