import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import PrimaryTab from "@/islands/PrimaryTab.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabaseClient } from "@/utils/supabase.ts";
import { Profile } from "@/utils/types.ts";

interface Query {
  mainProfiles: Profile[];
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const query = supabaseClient
      .from("profiles")
      .select(
        "id, firstname, lastname, gender, status, target, description, views, cities(*)",
      );
    const { data } = await query;
    const mainProfiles: Profile[] = data?.map((d) => ({
      id: d.id,
      fullname: `${d.lastname} ${d.firstname}`,
      gender: d.gender,
      target: d.target,
      status: d.status,
      description: d.description,
      city: d.cities,
    })) || [];

    return ctx.render({ mainProfiles });
  },
};

export default function Home(ctx: PageProps<Query>) {
  const { mainProfiles } = ctx.data;
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex lg:flex-row md:flex-col">
          <div class="md:w-2/3">
            <PrimaryTab title="Tim ban gai" profiles={mainProfiles} />
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
