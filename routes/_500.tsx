import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Layout } from "@/islands/Nav.tsx";

interface Query {
  error: Error | null;
}

export default function ServerError(ctx: PageProps<Query>) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Error</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex lg:flex-row md:flex-col">
          <div class="md:w-2/3">Co loi xay ra</div>
          <div class="w-1/3"></div>
        </div>
      </div>
    </Layout>
  );
}
