import { supabaseClient } from "@/utils/supabase.ts";
import { tables } from "@/utils/types.ts";

export async function getCities() {
  const fields = "id, name";
  const query = supabaseClient.from(tables.cities).select(fields);
  const { data } = await query;

  return data;
}
