import { JSX } from 'preact';

export function PrimaryProfileCard(
  props: JSX.HTMLAttributes<HTMLButtonElement>
) {
  return (
    <>
      <div className="w-full lg:flex my-2">
        {/* <div
          className="h-36 lg:w-36 lg:h-36 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style="background-image: url('https://tailwindcss.com/img/card-left.jpg')"
          title="Woman holding a mug"
        ></div> */}
        <div class="w-48 h-auto">
          <img
            class="w-full rounded-2xl"
            src="https://tailwindcss.com/img/card-left.jpg"
          />
        </div>
        <div className="border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t bg-white rounded-b lg:rounded-r pl-4">
          <a class="text-xl text-purple-800 font-semibold" href="/profile/1">
            username
          </a>
          {/* <div className="mb-8"> */}
          <p className="text-sm text-gray-600 flex items-center">
            Members only
          </p>
          <p className="text-gray-900 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
