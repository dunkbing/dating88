import * as redis from "redis";
import { supabaseClient } from "@/utils/supabase.ts";
import {
  Gender,
  ProfileUpdate,
  profileUpdate,
  Status,
  Supabase,
  tables,
  Target,
  UserCreate,
  userCreate,
} from "@/utils/types.ts";
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
      "id, user_id, firstname, lastname, gender, status, target, description, date_of_birth, height, weight, cities(*)",
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
        void supabaseClient.from(tables.profileViews).upsert({
          id: data?.id,
          profile_id: id,
          views: (data?.views || 0) + 1,
        });
      });
  }

  return profile;
}

export async function createProfile(user: UserCreate) {
  const { firstname, lastname, email, password } = userCreate.parse(user);
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  if (error) return error;
  if (data.user?.identities?.length) {
    const { data: profile, error } = await supabaseClient
      .from(tables.profiles)
      .upsert({
        user_id: data.user.id,
        firstname,
        lastname,
      });
    console.log("createProfile", profile, error);
    return error;
  }
}

export async function updateProfile(userId: string, profile: ProfileUpdate) {
  const parsedProfile = profileUpdate.parse(profile);
  // delete parsedProfile.id;
  const { data, error, status, statusText } = await supabaseClient
    .from(tables.profiles)
    .update(parsedProfile)
    .eq("user_id", userId);
  console.log(data, error, status, statusText);
  return { data, error };
}

export async function getProfileByUserId(userId: string) {
  const { data: profile } = await supabaseClient
    .from(tables.profiles)
    .select(
      "id, user_id, firstname, lastname, gender, status, target, description, date_of_birth, height, weight, education, cities(*)",
    )
    .eq("user_id", userId)
    .single();

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
