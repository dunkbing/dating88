import { Handlers } from '$fresh/server.ts';
import { redirect } from '@/utils/mod.ts';

export const handler: Handlers = {
  GET: (_req, ctx) => {
    const { provider } = ctx.params;
    return redirect(
      `${ctx.API_URL}/connect/${provider}?callback=${ctx.BASE_URL}/api/${provider}/auth`
    );
  },
};
