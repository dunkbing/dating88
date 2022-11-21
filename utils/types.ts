import { City } from "./cities.ts";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  GAY = "gay",
  LES = "les",
}

export const genderMap: { [key in Gender]: string } = {
  male: "nam",
  female: "nu",
  gay: "gay",
  les: "les",
};

export enum Status {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
}

export const statusMap: { [key in Status]: string } = {
  single: "doc than",
  married: "da ket hon",
  divorced: "ly di",
};

export enum Target {
  FRIENDSHIP = "friendship",
  SEXUAL_RELATIONSHIP = "sexual-relationship",
}

export const targetMap: { [key in Target]: string } = {
  friendship: "bạn bè",
  "sexual-relationship": "",
};

export interface Profile {
  id: number;
  fullname: string;
  gender: Gender;
  status: Status;
  target: Target;
  description: string;
  city?: City;
}

export const tables = {
  users: "users",
  profiles: "profiles",
};
