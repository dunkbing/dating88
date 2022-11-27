import * as base64 from "$std/encoding/base64.ts";
import * as redis from "redis";
import { MiddlewareHandler } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { USER_ID_COOKIE_NAME, userRedisKey } from "./constants.ts";

export const redirect = (Location: string) =>
  new Response(null, {
    status: 302,
    headers: new Headers({
      Location,
    }),
  });

export function getAge(dateString?: string) {
  const today = new Date();
  const birthDate = new Date(String(dateString));
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function fromFormData<T = any>(formData: FormData) {
  const res: Record<string, string> = {};
  formData.forEach((v, k) => (res[k] = v as string));

  return res as T;
}

export function getRoomCode(input: string[]) {
  return base64.encode(input.sort().join("-")).substring(0, 25);
}

export function getAvatar(name: string) {
  return `https://eu.ui-avatars.com/api/?name=${name}&size=1000`;
}

export function privateRoute<T>(
  redirectPath?: string,
): MiddlewareHandler<T & { store: redis.Redis }> {
  return async (req, ctx) => {
    const cookies = getCookies(req.headers);
    const user = await ctx.state.store.get(
      userRedisKey(cookies[USER_ID_COOKIE_NAME]),
    );
    if (user) {
      return await ctx.next();
    }

    return redirectPath
      ? redirect(redirectPath)
      : Response.json({ message: "Unauthorized" }, { status: 401 });
  };
}
