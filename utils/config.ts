import { config } from "$std/dotenv/mod.ts";
import { cleanEnv, host, num, str, url } from "envalid";

const RAW_ENV = Object.assign(Deno.env.toObject(), await config());

const ENV = cleanEnv(RAW_ENV, {
  DENO_ENV: str({ choices: ["development", "testing", "production"] }),
  SUPABASE_URL: url(),
  SUPABASE_ANON_KEY: str(),
  REDIS_HOST: host(),
  REDIS_PORT: num(),
  REDIS_USER: str(),
  REDIS_PASS: str(),
});

export const {
  DENO_ENV,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASS,
} = ENV;

export default ENV;
