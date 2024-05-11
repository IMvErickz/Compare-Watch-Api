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

// src/controllers/brand/getBrandId.ts
var getBrandId_exports = {};
__export(getBrandId_exports, {
  GetBrandId: () => GetBrandId
});
module.exports = __toCommonJS(getBrandId_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/brand/getBrandId.ts
var import_zod = require("zod");
async function GetBrandId(app) {
  app.get("/brand/:id", async (request) => {
    const brandSchema = import_zod.z.object({
      id: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetBrandId
});
