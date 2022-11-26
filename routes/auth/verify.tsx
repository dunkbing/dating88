import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/islands/Nav.tsx";
import Verify from "../../islands/Verify.tsx";
import { lang } from "../../utils/i18n.ts";

export default function (ctx: PageProps) {
  return (
    <Layout>
      <div>
        <Head>
          <title>{lang("dating88")}</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex lg:flex-row md:flex-col">
          <div class="md:w-2/3">
            <Verify />
          </div>
          <div class="w-1/3"></div>
        </div>
      </div>
    </Layout>
  );
}
