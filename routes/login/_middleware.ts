import { MiddlewareHandler } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import * as redis from "redis";
import { redirect } from "@/utils/mod.ts";
import { USER_ID_COOKIE_NAME, userRedisKey } from "@/utils/constants.ts";

interface State {
  store: redis.Redis;
}

export const handler: MiddlewareHandler<State> = async (_req, ctx) => {
  const cookies = getCookies(_req.headers);
  const user = await ctx.state.store.get(
    userRedisKey(cookies[USER_ID_COOKIE_NAME]),
  );
  if (user) {
    return redirect("/");
  }

  return await ctx.next();
};
