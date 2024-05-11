import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  NODE_ENV: z.enum(["develop", "test", "production"]).default("develop"),
  PORT: z.coerce.number().default(3333),
  SECRET: z.string().default('compareWatchAPISecret')
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("❌ Invalid environmant variables");

  throw new Error("Invalid environmant variables");
}

export const env = _env.data;
