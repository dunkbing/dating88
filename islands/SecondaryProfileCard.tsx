import { Profile } from "@/utils/types.ts";
import { getAge } from "../utils/mod.ts";

type Props = Profile;

function SecondaryProfileCard(props: Props) {
  return (
    <>
      <div className="w-full lg:flex my-1">
        <img class="w-24 h-24 mt-1 rounded-xl" src="/haibara.webp" />
        <div className="border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t lg:border-gray-50 bg-white rounded-b lg:rounded-b-none lg:rounded-r pl-4 flex flex-col leading-normal">
          <a
            class="text-xl text-purple-800 font-semibold capitalize"
            href="/profile/1"
          >
            {props.fullname} - {getAge(props.dateOfBirth)}
          </a>
          <p className="text-gray-900 text-sm">{props.description}</p>
        </div>
      </div>
    </>
  );
}

export default SecondaryProfileCard;
