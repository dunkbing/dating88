import { Handlers } from "$fresh/server.ts";
import { supabaseClient } from "@/utils/supabase.ts";
import { Gender, Profile, tables } from "@/utils/types.ts";
import { redirect } from "@/utils/mod.ts";

interface Query {
  profiles: Profile[];
}

function getProfiles(type: string, gender: Gender) {
  const query = supabaseClient
    .from(tables.profiles)
    .select(
      "id, firstname, lastname, gender, status, target, description, views, cities(*)",
    )
    .eq("gender", gender);
  const newestQuery = query.order("id", { ascending: false }).range(0, 10);
  const mostViewsQuery = query
    .order("views", { ascending: false })
    .range(0, 10);
  return type === "newest" ? newestQuery : mostViewsQuery;
}

export const handler: Handlers<Query> = {
  async GET(_req, _ctx) {
    try {
      const url = new URL(_req.url);
      const type = String(url.searchParams.get("type"));
      const gender = String(url.searchParams.get("gender"));
      const query = getProfiles(type, gender as Gender);
      const { data } = await query;
      const profiles: Profile[] = data?.map((d) => ({
        id: d.id,
        fullname: `${d.lastname} ${d.firstname}`,
        gender: d.gender,
        target: d.target,
        status: d.status,
        description: d.description,
        city: d.cities,
      })) || [];

      return Response.json(profiles);
    } catch (_error) {
      return redirect("/error");
    }
  },
};
