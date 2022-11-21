import { Handlers } from '$fresh/server.ts';
import Signup from '@/islands/SignupForm.tsx';
import { Layout } from '@/islands/Nav.tsx';
import { supabase } from '@/utils/supabase.ts';

export const handler: Handlers = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
  POST: async (req, ctx) => {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    });
    return ctx.render({ ...ctx.state, error });
  },
};

const SignupPage = ({ data }) => {
  const { error } = data;
  return (
    <Layout data={data}>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
          <div>
            <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Workflow" />
            <h2 class="mt-6 mb-8 text-center text-3xl tracking-tight font-bold text-gray-900">
              Create an account
            </h2>
            {error ? <p class="text-red-500">{error.message}</p> : ''}
          </div>
          <Signup />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
