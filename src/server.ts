import Fastify from "fastify";
import Cors from "@fastify/cors";
import { CreateUser } from "./controllers/user/create";
import { getUserId } from "./controllers/user/getUserId";
import { CreateWatch } from "./controllers/watch/create";
import { getAllWatches } from "./controllers/watch/getAllWatches";
import { GetWatchId } from "./controllers/watch/getWatchId";
import { GetAllBrand } from "./controllers/brand/getAllBrand";
import { GetBrandId } from "./controllers/brand/getBrandId";
import { auth } from "./controllers/user/auth";
import jwt from "@fastify/jwt";
import { env } from "./env";

const app = Fastify({
  logger: true,
});

app.register(Cors, {
  origin: true,
});

app.register(jwt, {
  secret: env.SECRET,
});

app.register(CreateUser);
app.register(getUserId);
app.register(auth)

app.register(CreateWatch);
app.register(getAllWatches);
app.register(GetWatchId);

app.register(GetAllBrand);
app.register(GetBrandId);

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log("🚀🚀🚀 Server is running"));
