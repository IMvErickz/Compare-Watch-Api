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

// src/controllers/user/create.ts
var create_exports = {};
__export(create_exports, {
  CreateUser: () => CreateUser
});
module.exports = __toCommonJS(create_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/user/create.ts
var import_zod = require("zod");
var import_bcrypt = __toESM(require("bcrypt"));
async function CreateUser(app) {
  app.post("/user", async (request, response) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUser
});
