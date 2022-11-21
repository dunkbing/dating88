export const redirect = (Location: string) =>
  new Response(null, {
    status: 302,
    headers: new Headers({
      Location,
    }),
  });
