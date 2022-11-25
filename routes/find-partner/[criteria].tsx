import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Gap from "@/components/Gap.tsx";
import { Layout } from "@/islands/Nav.tsx";
import PrimaryTab from "@/islands/PrimaryTab.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import { Gender, Profile, Supabase, titleGenderMap } from "@/utils/types.ts";
import { redirect } from "@/utils/mod.ts";
import { getProfilesByCriteria } from "@/utils/profile.ts";

interface Query {
  profiles: Profile[];
  title: string;
  user?: Supabase.User;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const { criteria } = ctx.params;
    try {
      const { data } = await getProfilesByCriteria(criteria, 0);
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

      const user = ctx.state.user as Supabase.User;

      return ctx.render({ profiles, title: titleGenderMap[criteria], user });
    } catch (error) {
      return redirect("/");
    }
  },
};

export default function (ctx: PageProps<Query>) {
  const { profiles, title, user } = ctx.data;
  return (
    <Layout user={user}>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <PrimaryTab title={title} profiles={profiles} />
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
