import * as base64 from "$std/encoding/base64.ts";

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
