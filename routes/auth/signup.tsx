import { Handlers, PageProps } from "$fresh/server.ts";
import SignupForm from "@/islands/SignupForm.tsx";
import { Layout } from "@/islands/Nav.tsx";
import { lang } from "@/utils/i18n.ts";
import { createProfile } from "@/utils/profile.ts";
import { UserCreate } from "@/utils/types.ts";
import { Head } from "$fresh/runtime.ts";

type Props = {
  error?: Error | null;
  status?: "success" | "failed";
};

export const handler: Handlers<Props> = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const body: Record<string, string> = {};
    formData.forEach((v, k) => (body[k] = v as string));
    console.log(body);
    const error = await createProfile(body as UserCreate);
    // http://localhost:8000/#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY5MDA0Mzc1LCJzdWIiOiJkNzgxZTU5NS00YWI3LTRlYWQtOWM0Zi02MjU3NTIyNzIwYTkiLCJlbWFpbCI6ImR1bmtiaW5nZ0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzZXNzaW9uX2lkIjoiOTA0ZjFjNzAtN2Y2OC00MWE0LTg4NGQtMDBhODJkZjY2MzZhIn0.ae6RnIkLMrMQwT60HkOcwXZ7xk-70h0H7J0J9LxfEhQ&expires_in=3600&refresh_token=CTrb_Ydqx41qdJFPFk3_8g&token_type=bearer&type=signup
    return ctx.render({
      ...ctx.state,
      error: error && new Error("da xay ra loi. vui long thu lai sau"),
      status: !error ? "success" : "failed",
    });
  },
};

const SignupPage = (props: PageProps<Props>) => {
  const error = props.data?.error;

  return (
    <Layout data={props.data}>
      <div>
        <Head>
          <title>{lang("signUp")}</title>
        </Head>
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full">
            <div>
              <h2 class="mt-6 mb-8 text-center text-3xl tracking-tight font-bold text-gray-900">
                {lang("createAnAccount")}
              </h2>
              {error && <p class="text-red-500">{error.message}</p>}
            </div>
            <SignupForm />
            {props.data?.status === "success" && (
              <p class="text-green-500">{lang("createAnAccountSuccess")}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
