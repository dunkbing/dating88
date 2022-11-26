import { MiddlewareHandler, MiddlewareHandlerContext } from "$fresh/server.ts";
import { blue, cyan, green, magenta, red, yellow } from "$std/fmt/colors.ts";
import { deleteCookie, getCookies } from "$std/http/cookie.ts";
import * as redis from "redis";
import {
  DENO_ENV,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
  REDIS_USER,
} from "@/utils/config.ts";
import { USER_ID_COOKIE_NAME, userRedisKey } from "../utils/constants.ts";

const store = await redis.connect({
  password: REDIS_PASS,
  hostname: REDIS_HOST,
  username: REDIS_USER,
  port: REDIS_PORT,
});

const setupUserSession = async (
  req: Request,
  ctx: MiddlewareHandlerContext,
) => {
  const cookies = getCookies(req.headers);
  if (cookies[USER_ID_COOKIE_NAME]) {
    const user = await store.get(userRedisKey(cookies[USER_ID_COOKIE_NAME]));
    if (user) {
      ctx.state.user = JSON.parse(user);
      return await ctx.next();
    } else {
      delete ctx.state.user;
      const resp = await ctx.next();
      deleteCookie(resp.headers, USER_ID_COOKIE_NAME);
    }
  }
  return await ctx.next();
};

export const handler: MiddlewareHandler = async (req, ctx) => {
  // For Logging
  const start = Date.now();
  const { pathname } = new URL(req.url);
  const withSession = ["/", "/login", "/signup", "/logout", "/account"];
  ctx.state.store = store;
  let resp: Response;
  if (
    withSession.includes(pathname) ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/find-partner") ||
    pathname.startsWith("/profile")
  ) {
    ctx.state.DENO_ENV = DENO_ENV;
    resp = await setupUserSession(req, ctx);
  } else {
    resp = await ctx.next();
  }
  const now = Date.now();
  const ms = now - start;
  const status = () => {
    const str = resp.status.toString();
    if (str[0] === "2") {
      return green(str);
    }
    if (str[0] === "3") {
      return yellow(str);
    } else {
      return red(str);
    }
  };
  resp.headers.set("X-Response-Time", `${ms}ms`);
  console.log(
    `[${magenta(new Date(now).toISOString())}] ${blue(req.method)} ${
      cyan(
        pathname,
      )
    } - ${blue(String(ms) + "ms")} - ${status()}`,
  );

  return resp;
};
