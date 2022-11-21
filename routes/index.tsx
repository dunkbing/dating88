import { Head } from '$fresh/runtime.ts';
import { Layout } from '@/islands/Nav.tsx';
import Gap from '@/components/Gap.tsx';
import PrimaryTab from '@/islands/PrimaryTab.tsx';
import SecondaryTab from '@/islands/SecondaryTab.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import { supabaseClient } from '@/utils/supabase.ts';
import { Profile } from '@/utils/types.ts';

interface Query {
  mainProfiles: Profile[];
  newestProfiles: Profile[];
  mostViewsProfiles: Profile[];
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const query = supabaseClient
      .from('profiles')
      .select(
        'id, firstname, lastname, gender, status, target, description, views, cities(*)'
      );
    const newestQuery = query.order('id', { ascending: false }).range(0, 10);
    const mostViewsQuery = query
      .order('views', { ascending: false })
      .range(0, 10);
    const [{ data: mpData }, { data: newestData }, { data: mostViewsData }] =
      await Promise.all([query, newestQuery, mostViewsQuery]);
    // const { data: mpData } = await query;
    const [mainProfiles, newestProfiles, mostViewsProfiles]: Profile[][] = [
      mpData,
      newestData,
      mostViewsData,
    ].map(
      (arr) =>
        arr?.map((d) => ({
          id: d.id,
          fullname: `${d.lastname} ${d.firstname}`,
          gender: d.gender,
          target: d.target,
          status: d.status,
          description: d.description,
          city: d.cities,
        })) || []
    );

    return ctx.render({ mainProfiles, newestProfiles, mostViewsProfiles });
  },
};

export default function Home(ctx: PageProps<Query>) {
  const { mainProfiles, newestProfiles, mostViewsProfiles } = ctx.data;
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <PrimaryTab title="Tim ban gai" profiles={mainProfiles} />
          </div>
          <div class="w-1/3">
            <SecondaryTab title="Thành viên mới" profiles={newestProfiles} />
            <Gap />
            <SecondaryTab title="Xem nhiều nhất" profiles={mostViewsProfiles} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
