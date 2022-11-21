import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/islands/Nav.tsx";
import Gap from "@/components/Gap.tsx";
import SecondaryTab from "@/islands/SecondaryTab.tsx";
import Profile from "../../islands/Profile.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Query {
  message: string;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    // const data = await graphql<Query>(q, { product: ctx.params.product });
    // if (!data.product) {
    //   return new Response("Product not found", { status: 404 });
    // }
    return ctx.render({ message: "ok" });
  },
};

export default function (ctx: PageProps<Query>) {
  console.log(ctx.data.message);
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <Profile />
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
