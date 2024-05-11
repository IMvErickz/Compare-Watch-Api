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

// src/controllers/watch/getWatchId.ts
var getWatchId_exports = {};
__export(getWatchId_exports, {
  GetWatchId: () => GetWatchId
});
module.exports = __toCommonJS(getWatchId_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/watch/getWatchId.ts
var import_zod = require("zod");
async function GetWatchId(app) {
  app.get("/watch/:id", async (request) => {
    const watchSchema = import_zod.z.object({
      id: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetWatchId
});
