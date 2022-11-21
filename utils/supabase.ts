import { createClient } from "supabase";
import { DENO_ENV, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/utils/config.ts";
import { cities } from "./cities.ts";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (DENO_ENV !== "development") {
  Object.entries(cities).forEach((v, k) => console.log(k, v));
  for (const k in cities) {
    const city = cities[k];
    const res = await supabaseClient.from("cities").upsert({
      id: Number(city.code),
      ...city,
    });
    console.log(res);
  }
}
