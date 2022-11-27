import Gap from "@/components/Gap.tsx";
import { genderMap, Profile, statusMap, targetMap } from "@/utils/types.ts";
import Carousel from "@/islands/Carousel.tsx";
import { getAge } from "@/utils/mod.ts";
import { lang } from "@/utils/i18n.ts";

interface Props {
  profile: Profile;
  userId?: string;
}

export default function ({ profile, userId }: Props) {
  return (
    <div class="w-full">
      <div class="p-8 bg-white shadow">
        <div>
          <Carousel />
          <Gap.XS />
          {profile.user_id !== userId && (
            <div class="space-x-2">
              {
                /* <button class="text-white py-2 px-4 uppercase rounded-full hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-500">
              Like
            </button> */
              }
              <button class="text-white py-2 px-4 uppercase rounded-full bg-red-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 bg-gradient-to-br from-red-500 via-pink-500 to-red-500 focus:outline-none focus:ring focus:ring-pink-300">
                {lang("like")}
              </button>
              <button class="text-white py-2 px-4 uppercase rounded-full bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 bg-gradient-to-br from-green-700 to-green-500 focus:outline-none focus:ring focus:ring-green-300">
                {lang("message")}
              </button>
            </div>
          )}
        </div>
        <div class="mt-2 border-b pb-2">
          <h1 class="text-4xl font-medium text-gray-700 capitalize">
            {`${profile.lastname} ${profile.firstname}`},{" "}
            {profile.dateOfBirth && (
              <span class="font-light text-gray-500">
                {getAge(profile.dateOfBirth)}
              </span>
            )}
          </h1>
          <p class="font-light text-gray-600 mt-3">{profile.city}</p>
          <p class="font-light text-gray-600 capitalize mt-3">
            {genderMap[profile.gender]} - {statusMap[profile.status]} - Cao{" "}
            {profile.height}
            cm - Nặng {profile.weight} kg - Đại học
          </p>
          <p class="font-light mt-3 text-gray-600">
            Mục tiêu: {targetMap[profile.target]}
          </p>
        </div>
        <p class="text-gray-600 mt-2">{profile.description}</p>
      </div>
    </div>
  );
}
