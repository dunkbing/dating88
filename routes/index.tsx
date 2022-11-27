import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Nav, { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import PrimaryTab from "@/islands/PrimaryTab.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import { Profile, Supabase } from "@/utils/types.ts";
import { getProfileByUserId, getProfiles } from "@/utils/profile.ts";
import Pagination from "@/islands/Pagination.tsx";
import { Footer } from "@/components/Footer.tsx";
import { JSX } from "preact/jsx-runtime";
import { DENO_ENV } from "../utils/config.ts";
import { lang } from "../utils/i18n.ts";

interface Query {
  mainProfiles: Profile[];
  page: number;
  totalPage: number | null;
  user: Supabase.User;
  profile: Profile;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const url = new URL(_req.url);
    const page = Number(url.searchParams.get("p") || 0);
    const { data, totalPage } = await getProfiles(page);
    const mainProfiles: Profile[] = data?.map((d) => ({
      id: d.id,
      lastname: d.lastname,
      firstname: d.firstname,
      gender: d.gender,
      target: d.target,
      status: d.status,
      description: d.description,
      city: d.cities,
      dateOfBirth: d.date_of_birth,
    })) || [];
    const user = ctx.state.user as Supabase.User;
    const profile = await getProfileByUserId(user.id);

    return ctx.render({
      mainProfiles,
      page,
      totalPage,
      user,
      profile: { ...profile },
    });
  },
};

export default function Home(ctx: PageProps<Query>) {
  const { mainProfiles, page, totalPage, user, profile } = ctx.data;

  return (
    <Layout user={user} profile={profile}>
      <div>
        <Head>
          <title>{lang("dating88")}</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex lg:flex-row md:flex-col space-x-4">
          <div class="md:w-2/3">
            <PrimaryTab title="Kết bạn bốn phương" profiles={mainProfiles} />
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

interface LayoutProps {
  children: JSX.Element;
  user?: Supabase.User;
  // deno-lint-ignore no-explicit-any
  data?: any;
}

export const Layout1 = ({ children, user, data }: LayoutProps) => {
  return (
    <>
      <Nav user={user} />
      {children}
      <Footer />
      {DENO_ENV === "development"
        ? <pre>{JSON.stringify(data, null, 2)}</pre>
        : (
          ""
        )}
    </>
  );
};
