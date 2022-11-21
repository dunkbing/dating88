import { JSX } from "preact";
import { Profile } from "@/utils/types.ts";

type Props = Profile;

function SecondaryProfileCard(props: Props) {
  return (
    <>
      <div className="w-full lg:flex my-1">
        <img
          class="w-24 h-24 mt-1 rounded-xl"
          src="https://tailwindcss.com/img/card-left.jpg"
        />
        <div className="border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t lg:border-gray-50 bg-white rounded-b lg:rounded-b-none lg:rounded-r pl-4 flex flex-col justify-between leading-normal">
          <a
            class="text-xl text-purple-800 font-semibold capitalize"
            href="/profile/1"
          >
            {props.fullname} - 32
          </a>
          <p className="text-gray-900 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </>
  );
}

export default SecondaryProfileCard;
