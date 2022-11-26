import { Handlers } from "$fresh/server.ts";
import { supabaseClient } from "@/utils/supabase.ts";
import { Supabase } from "@/utils/types.ts";
import { redirect } from "@/utils/mod.ts";

interface Query {
  getUser: Supabase.User;
}

export const handler: Handlers<Query> = {
  async GET(_req, _ctx) {
    try {
      const url = new URL(_req.url);
      const accessToken = String(url.searchParams.get("access_token"));
      const { data, error } = await supabaseClient.auth.getUser(accessToken);

      return Response.json({ data, error });
    } catch (_error) {
      return redirect("/error");
    }
  },
};
