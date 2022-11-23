import { JSX } from "preact/jsx-runtime";
import { Handlers, PageProps } from "$fresh/server.ts";
import * as redis from "redis";
import Login from "@/islands/LoginForm.tsx";
import { Layout } from "@/islands/Nav.tsx";
import { supabaseClient } from "@/utils/supabase.ts";
import { redirect } from "@/utils/mod.ts";
import { setCookie } from "$std/http/cookie.ts";
import { USER_ID_COOKIE_NAME } from "@/utils/constants.ts";

interface Query {
  error: Error | null;
}

interface State {
  store: redis.Redis;
}

export const handler: Handlers<Query, State> = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state, error: null });
  },
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const body: Record<string, string> = {};
    formData.forEach((v, k) => (body[k] = v as string));
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    const resp = data ? redirect("/") : await ctx.render({ error });

    if (data.user) {
      setCookie(resp.headers, {
        name: USER_ID_COOKIE_NAME,
        value: data.user.id,
      });
      await ctx.state.store.set(
        `user-${data.user.id}`,
        JSON.stringify(data.user),
        {
          ex: 7 * 24 * 60 * 60,
        },
      );
    }
    return resp;
  },
};

const PageLogin = ({ data }: PageProps<Query>) => {
  const { error } = data;
  return (
    <Layout data={data}>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
          <div>
            <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Workflow" />
            <h2 class="mt-6 mb-8 text-center text-3xl tracking-tight font-bold text-gray-900">
              Sign in to your account
            </h2>
            {error ? <p class="text-red-500">{error.message}</p> : ""}
          </div>
          <Login />
          {
            /* <LoginOAuth provider="github">Sign in with Github</LoginOAuth>
          <LoginOAuth provider="discord">Sign in with Discord</LoginOAuth> */
          }
        </div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Layout>
  );
};

interface LoginOAuthProps {
  provider: string;
  children: JSX.Element | string;
}

export const LoginOAuth = ({ provider, children }: LoginOAuthProps) => (
  <a
    href={`/login/${provider}`}
    id={`login-${provider}`}
    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 mt-3"
  >
    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
      <svg
        class="h-5 w-5 text-pink-300 group-hover:text-pink-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    {children}
  </a>
);

export default PageLogin;
