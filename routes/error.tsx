import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Layout } from "../islands/Nav.tsx";

export default function Greet(props: PageProps) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">Da xay ra loi</div>
        </div>
      </div>
    </Layout>
  );
}
