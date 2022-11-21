import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Gap from "@/components/Gap.tsx";
import { Layout } from "@/islands/Nav.tsx";
import PrimaryTab from "@/islands/PrimaryTab.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import { supabaseClient } from "@/utils/supabase.ts";
import { Gender, Profile, Status, tables, Target } from "@/utils/types.ts";
import { citySlugs } from "@/utils/cities.ts";
import { redirect } from "../../utils/mod.ts";

interface Query {
  profiles: Profile[];
}

function getProfiles(criteria: string) {
  const query = supabaseClient
    .from(tables.profiles)
    .select(
      "id, firstname, lastname, gender, status, target, description, views, cities(*)",
    );
  switch (true) {
    case Object.values(Gender).includes(criteria as Gender):
      console.log("case gender");
      return query.eq("gender", criteria);
    case Object.values(Status).includes(criteria as Status):
      console.log("case status");
      return query.eq("status", criteria);
    case Object.values(Target).includes(criteria as Target):
      console.log("case target");
      return query.eq("target", criteria);
    case citySlugs.includes(criteria):
      console.log("case city");
      return query.eq("cities.slug", criteria);
    default:
      throw new Error("Da xay ra loi");
  }
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const { criteria } = ctx.params;
    try {
      const query = getProfiles(criteria);
      const { data } = await query.range(0, 10);
      const profiles: Profile[] = data?.map((d) => ({
        id: d.id,
        fullname: `${d.lastname} ${d.firstname}`,
        gender: d.gender,
        target: d.target,
        status: d.status,
        description: d.description,
        city: d.cities,
      })) || [];

      return ctx.render({ profiles });
    } catch (error) {
      return redirect("/");
    }
  },
};

export default function (ctx: PageProps<Query>) {
  const { profiles } = ctx.data;
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <PrimaryTab title="Tim ban gai" profiles={profiles} />
          </div>
          <div class="w-1/3">
            <SecondaryTab title="Thành viên mới" />
            <Gap />
            <SecondaryTab title="Xem nhiều nhất" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
