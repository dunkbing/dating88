import { config } from "$std/dotenv/mod.ts";
import { cleanEnv, str, url } from "envalid";

const RAW_ENV = Object.assign(Deno.env.toObject(), await config());

const ENV = cleanEnv(RAW_ENV, {
  DENO_ENV: str({ choices: ["development", "testing", "production"] }),
  BASE_URL: url(),
  SUPABASE_URL: url(),
  SUPABASE_ANON_KEY: str(),
  SUPABASE_SERVICE_ROLE: str(),
});

export const {
  DENO_ENV,
  BASE_URL,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE,
  SUPABASE_ANON_KEY,
} = ENV;

export default ENV;
