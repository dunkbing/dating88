import { JSX } from 'preact';

export function PrimaryProfileCard(
  props: JSX.HTMLAttributes<HTMLButtonElement>
) {
  return (
    <>
      <div className="w-full lg:flex my-2">
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
          <div class="font-medium flex items-center space-x-2">
            <a
              href="/find-partner/nu"
              class="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Nu
            </a>
            <p>-</p>
            <p>32</p>
            <p>-</p>
            <a
              href="/find-partner/nu"
              class="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Da co gia dinh
            </a>
            <p>-</p>
            <a
              href="/find-partner/nu"
              class="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Tim ban tam su
            </a>
            <p>-</p>
            <a
              href="/find-partner/nu"
              class="text-blue-600 dark:text-blue-500 hover:underline"
            >
              TP Ho Chi Minh
            </a>
          </div>
          <p className="text-gray-900 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </>
  );
}
