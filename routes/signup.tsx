import { Handlers, PageProps } from "$fresh/server.ts";
import Signup from "@/islands/SignupForm.tsx";
import { Layout } from "@/islands/Nav.tsx";
import { supabaseClient } from "@/utils/supabase.ts";

export const handler: Handlers = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const body: Record<string, string> = {};
    formData.forEach((v, k) => (body[k] = v as string));
    const { data, error } = await supabaseClient.auth.signUp({
      email: body.email,
      password: body.password,
    });
    console.log(data);
    // http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY5MDA0Mzc1LCJzdWIiOiJkNzgxZTU5NS00YWI3LTRlYWQtOWM0Zi02MjU3NTIyNzIwYTkiLCJlbWFpbCI6ImR1bmtiaW5nZ0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzZXNzaW9uX2lkIjoiOTA0ZjFjNzAtN2Y2OC00MWE0LTg4NGQtMDBhODJkZjY2MzZhIn0.ae6RnIkLMrMQwT60HkOcwXZ7xk-70h0H7J0J9LxfEhQ&expires_in=3600&refresh_token=CTrb_Ydqx41qdJFPFk3_8g&token_type=bearer&type=signup
    return ctx.render({ ...ctx.state, error });
  },
};

const SignupPage = ({ data }: PageProps) => {
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
            {error ? <p class="text-red-500">{error.message}</p> : ""}
          </div>
          <Signup />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
