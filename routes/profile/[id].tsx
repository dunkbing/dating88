import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import ProfileCpn from "@/islands/Profile.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Profile, Supabase, tables } from "@/utils/types.ts";
import { redirect } from "@/utils/mod.ts";
import { getProfile } from "@/utils/profile.ts";
import { lang } from "../../utils/i18n.ts";

interface Query {
  profile: Profile;
  user?: Supabase.User;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    const profile = await getProfile(Number(id));
    if (profile) {
      const user = ctx.state.user as Supabase.User;
      return ctx.render({
        profile,
        user,
      });
    }

    return redirect("/_404");
  },
};

export default function (ctx: PageProps<Query>) {
  const { profile, user } = ctx.data;
  return (
    <Layout user={user}>
      <div>
        <Head>
          <title>{lang("dating88")}</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex space-x-8">
          <div class="w-2/3">
            <ProfileCpn profile={profile} userId={user?.id} />
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
