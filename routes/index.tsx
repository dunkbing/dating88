import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import PrimaryTab from "@/islands/PrimaryTab.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabaseClient } from "@/utils/supabase.ts";
import { Profile } from "@/utils/types.ts";

interface Query {
  profiles: Profile[];
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const query = await supabaseClient
      .from("profiles")
      .select(
        "id, firstname, lastname, gender, status, target, description, views, cities(*)",
      );
    const { data } = query;
    console.log("profiles", data);
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
  },
};

export default function Home(ctx: PageProps<Query>) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <PrimaryTab title="Tim ban gai" profiles={ctx.data.profiles} />
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
