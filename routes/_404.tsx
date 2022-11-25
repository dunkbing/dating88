import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import * as redis from "redis";
import { Layout } from "@/islands/Nav.tsx";
import { Supabase } from "@/utils/types.ts";

interface Query {
  error?: Error | null;
  user?: Supabase.User;
}

export default function NotFound(ctx: PageProps<Query>) {
  return (
    <Layout user={ctx.data?.user}>
      <div>
        <Head>
          <title>Error</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex lg:flex-row md:flex-col">
          <div class="md:w-2/3">Not found</div>
          <div class="w-1/3"></div>
        </div>
      </div>
    </Layout>
  );
}
