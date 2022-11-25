import { z } from "zod";
import { City } from "./cities.ts";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  GAY = "gay",
  LES = "les",
}

export const genderMap: { [key in Gender]: string } = {
  male: "nam",
  female: "nữ",
  gay: "gay",
  les: "les",
};

export const titleGenderMap: Record<string, string> = {
  [Gender.MALE]: "Tìm bạn trai",
  [Gender.FEMALE]: "Tìm bạn gái",
  [Gender.GAY]: "Gay",
  [Gender.LES]: "Les",
};

export enum Status {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  HAVING_LOVER = "having-lover",
  HAVING_FAMILY = "having-family",
}

export const statusMap: { [key in Status]: string } = {
  single: "độc thân",
  married: "đã kết hôn",
  divorced: "ly dị",
  "having-lover": "đang có người yêu",
  "having-family": "đã có gia đình",
};

export enum Target {
  FRIENDSHIP = "friendship",
  LONG_TERM_LOVER = "long-term-lover",
  SHORT_TERM_LOVER = "short-term-lover",
  JUST_CHATTING = "just-chatting",
}

export const targetMap: { [key in Target]: string } = {
  [Target.FRIENDSHIP]: "tìm bạn bè mới",
  [Target.LONG_TERM_LOVER]: "người yêu lâu dài",
  [Target.SHORT_TERM_LOVER]: "người yêu ngắn hạn",
  [Target.JUST_CHATTING]: "tìm bạn tâm sự",
};

export enum Education {
  HIGH_SCHOOL = "high-school",
  COLLEGE = "college",
  MASTER = "master",
  PHD = "phd",
}

export const educationMap: { [key in Education]: string } = {
  [Education.HIGH_SCHOOL]: "",
  [Education.COLLEGE]: "",
  [Education.MASTER]: "",
  [Education.PHD]: "",
};

export const RegisterUser = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email({ message: "email khong hop le" }),
  password: z.string().min(5, { message: "mat khau phai co it nhat 5 ky tu" }),
});

export interface Profile {
  id: number;
  fullname: string;
  gender: Gender;
  status: Status;
  target: Target;
  description: string;
  city?: City;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
}

export const tables = {
  users: "users",
  profiles: "profiles",
  profileViews: "profile_views",
};

export namespace Supabase {
  export interface AppMetadata {
    provider: string;
    providers: string[];
  }

  export interface UserMetadata {}

  export interface IdentityData {
    email: string;
    sub: string;
  }

  export interface Identity {
    id: string;
    user_id: string;
    identity_data: IdentityData;
    provider: string;
    last_sign_in_at: Date;
    created_at: Date;
    updated_at: Date;
  }

  export interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: Date;
    phone: string;
    confirmation_sent_at: Date;
    confirmed_at: Date;
    last_sign_in_at: string;
    app_metadata: AppMetadata;
    user_metadata: UserMetadata;
    identities: Identity[];
    created_at: Date;
    updated_at: Date;
  }
}
