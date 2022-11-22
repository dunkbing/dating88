import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import ProfileCpn from "@/islands/Profile.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Profile, tables } from "@/utils/types.ts";
import { supabaseClient } from "@/utils/supabase.ts";
import { redirect } from "@/utils/mod.ts";

interface Query {
  profile: Profile;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    const { data } = await supabaseClient
      .from(tables.profiles)
      .select(
        "id, firstname, lastname, gender, status, target, description, views, date_of_birth, height, weight, cities(*)",
      )
      .eq("id", Number(id))
      .single();
    if (data) {
      void supabaseClient.from;
      return ctx.render({
        profile: {
          ...data,
          fullname: `${data.lastname} ${data.firstname}`,
          city: data.cities.name,
          dateOfBirth: data.date_of_birth,
        },
      });
    }

    return redirect("/profile/not-found");
  },
};

export default function (ctx: PageProps<Query>) {
  const { profile } = ctx.data;
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <ProfileCpn profile={profile} />
          </div>
          <div class="w-1/3">
            <SecondaryTab title="Thành viên mới" type="newest" />
            <Gap />
            <SecondaryTab title="Xem nhiều nhất" type="most-views" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
