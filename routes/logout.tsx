import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";
import { Handlers } from "$fresh/server.ts";
import * as redis from "redis";
import { USER_ID_COOKIE_NAME, userRedisKey } from "@/utils/constants.ts";
import { redirect } from "@/utils/mod.ts";

interface Query {
  error: Error | null;
}

interface State {
  store: redis.Redis;
}

export const handler: Handlers<Query, State> = {
  GET: async (req, ctx) => {
    const cookies = getCookies(req.headers);
    const userId = cookies[USER_ID_COOKIE_NAME];

    const resp = redirect("/");
    if (userId) {
      const user = await ctx.state.store.get(userRedisKey(userId));
      if (user) {
        deleteCookie(resp.headers, USER_ID_COOKIE_NAME);
        await ctx.state.store.del(userRedisKey(cookies[USER_ID_COOKIE_NAME]));
      }
    }

    return resp;
  },
};
