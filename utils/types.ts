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
};
