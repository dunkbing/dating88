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
