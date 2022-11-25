import * as redis from "redis";
import { supabaseClient } from "@/utils/supabase.ts";
import { Gender, Status, Supabase, tables, Target } from "@/utils/types.ts";
import { citySlugs } from "@/utils/cities.ts";
import { userRedisKey } from "./constants.ts";

function getFromAndTo(page: number, itemsPerPage = 10) {
  const from = page * itemsPerPage;
  const to = from + itemsPerPage - 1;
  return [from, to];
}

export async function getProfiles(page: number, itemsPerPage = 10) {
  const [from, to] = getFromAndTo(page, itemsPerPage);
  const query = supabaseClient
    .from(tables.profiles)
    .select(
      "id, firstname, lastname, gender, status, target, description, date_of_birth, cities(*)",
      { count: "exact" },
    )
    .range(from, to);
  const { data, count } = await query;
  const totalPage = count ? Math.ceil(count / itemsPerPage) : null;
  return { data, totalItems: count, totalPage };
}

export async function getProfile(id: number) {
  const { data: profile } = await supabaseClient
    .from(tables.profiles)
    .select(
      "id, firstname, lastname, gender, status, target, description, date_of_birth, height, weight, cities(*)",
    )
    .eq("id", id)
    .single();

  if (profile) {
    void supabaseClient
      .from(tables.profileViews)
      .select("id, views")
      .eq("profile_id", id)
      .single()
      .then(({ data }) => {
        void supabaseClient
          .from(tables.profileViews)
          .upsert({
            id: data?.id,
            profile_id: id,
            views: (data?.views || 0) + 1,
          })
          .then(console.log);
      });
  }

  return profile;
}

export async function getProfilesByCriteria(
  criteria: string,
  page: number,
  itemsPerPage = 10,
) {
  const [from, to] = getFromAndTo(page, itemsPerPage);
  let query = supabaseClient
    .from(tables.profiles)
    .select(
      "id, firstname, lastname, gender, status, target, description, date_of_birth, cities(*)",
      { count: "exact" },
    );
  switch (true) {
    case Object.values(Gender).includes(criteria as Gender):
      query = query.eq("gender", criteria);
      break;
    case Object.values(Status).includes(criteria as Status):
      query = query.eq("status", criteria);
      break;
    case Object.values(Target).includes(criteria as Target):
      query = query.eq("target", criteria);
      break;
    case citySlugs.includes(criteria):
      query = query.eq("cities.slug", criteria);
      break;
    default:
      throw new Error("Da xay ra loi");
  }
  query = query.range(from, to);
  const { data, count } = await query;

  return { data, total: count };
}

export async function getUserFromCache(
  cache: redis.Redis,
  userId: string,
): Promise<Supabase.User | null> {
  const user = await cache.get(userRedisKey(userId));

  return user ? (JSON.parse(user) as Supabase.User) : null;
}
