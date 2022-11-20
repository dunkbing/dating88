import { JSX } from 'preact';

export function SecondaryProfileCard(
  props: JSX.HTMLAttributes<HTMLButtonElement>
) {
  return (
    <>
      <div className="w-full lg:flex my-1">
        <img
          class="w-24 h-24 mt-1"
          src="https://tailwindcss.com/img/card-left.jpg"
        />
        <div className="border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t lg:border-gray-50 bg-white rounded-b lg:rounded-b-none lg:rounded-r pl-4 flex flex-col justify-between leading-normal">
          <p class="text-sm text-gray-600 flex items-center">Members only</p>
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
