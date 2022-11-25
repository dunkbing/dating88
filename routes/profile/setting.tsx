import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "@/islands/Nav.tsx";
import { Supabase } from "@/utils/types.ts";
import ProfileSetting from "@/islands/ProfileSetting.tsx";
import { redirect } from "@/utils/mod.ts";

interface Query {
  user?: Supabase.User;
}

export const handler: Handlers<Query> = {
  GET(_req, ctx) {
    const user = ctx.state.user as Supabase.User;
    return user
      ? ctx.render({
        user,
      })
      : redirect("/");
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
            <ProfileSetting />
          </div>
        </div>
      </div>
    </Layout>
  );
}
