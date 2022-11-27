import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "@/islands/Nav.tsx";
import {
  Profile,
  ProfileUpdate,
  profileUpdate,
  Supabase,
} from "@/utils/types.ts";
import ProfileSetting from "@/islands/ProfileSetting.tsx";
import { fromFormData, redirect } from "@/utils/mod.ts";
import { getProfileByUserId, updateProfile } from "../../utils/profile.ts";

interface Query {
  user?: Supabase.User;
  profile?: Profile;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const user = ctx.state.user as Supabase.User;
    const profile = await getProfileByUserId(user?.id);
    return user
      ? ctx.render({
        user,
        profile: {
          ...profile,
          email: user?.email,
        },
      })
      : redirect("/");
  },
  async POST(_req, ctx) {
    const user = ctx.state.user as Supabase.User;
    if (!user) {
      throw new Error("not authenticated");
    }

    const body = await _req.formData();
    const profileRaw = fromFormData(body);
    const profile: ProfileUpdate = {
      ...profileRaw,
      city_id: Number(profileRaw.cityId),
      date_of_birth: new Date(profileRaw.dateOfBirth),
      height: Number(profileRaw.height),
      weight: Number(profileRaw.weight),
      description: profileRaw.description,
    };
    const { error } = await updateProfile(user.id, profile);
    console.log(error);

    return error ? ctx.render({ user }) : redirect("/profile/setting");
  },
};

export default function (ctx: PageProps<Query>) {
  const { data } = ctx;
  return (
    <Layout user={data?.user}>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3 mx-auto">
            <ProfileSetting profile={data?.profile} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
