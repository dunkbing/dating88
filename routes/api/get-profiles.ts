import { Handlers } from "$fresh/server.ts";
import { supabaseClient } from "@/utils/supabase.ts";
import { Gender, Profile, tables } from "@/utils/types.ts";
import { redirect } from "@/utils/mod.ts";

interface Query {
  profiles: Profile[];
}

async function getProfiles(type: string, gender: Gender) {
  const fields =
    "id, firstname, lastname, gender, status, target, description, date_of_birth, cities(*)";
  const query = supabaseClient
    .from(tables.profiles)
    .select(fields)
    .eq("gender", gender);
  const newestQuery = query.order("id", { ascending: false }).range(0, 10);
  if (type === "newest") {
    return newestQuery;
  }
  const { data } = await supabaseClient
    .from(tables.profileViews)
    .select("id, profile_id, views")
    .order("views", { ascending: false })
    .range(0, 10);
  const profileIds = data?.map((d) => d.profile_id) || [];
  console.log(profileIds);
  const mostViewsQuery = supabaseClient
    .from(tables.profiles)
    .select(fields)
    .in("id", profileIds)
    .eq("gender", gender)
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
        dateOfBirth: d.date_of_birth,
      })) || [];

      return Response.json(profiles);
    } catch (_error) {
      return redirect("/error");
    }
  },
};
