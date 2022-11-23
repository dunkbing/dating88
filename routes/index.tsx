import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import PrimaryTab from "@/islands/PrimaryTab.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import { Profile, Supabase } from "@/utils/types.ts";
import { getProfiles } from "@/utils/profile.ts";
import Pagination from "@/islands/Pagination.tsx";

interface Query {
  mainProfiles: Profile[];
  page: number;
  totalPage: number | null;
  user: Supabase.User;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const url = new URL(_req.url);
    const page = Number(url.searchParams.get("p") || 0);
    const { data, totalPage } = await getProfiles(page);
    const mainProfiles: Profile[] = data?.map((d) => ({
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

    return ctx.render({ mainProfiles, page, totalPage, user });
  },
};

export default function Home(ctx: PageProps<Query>) {
  const { mainProfiles, page, totalPage, user } = ctx.data;

  return (
    <Layout user={user}>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex lg:flex-row md:flex-col">
          <div class="md:w-2/3">
            <PrimaryTab title="Tim ban gai" profiles={mainProfiles} />
            <Pagination pageCount={totalPage || 1} currentPage={page} />
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
