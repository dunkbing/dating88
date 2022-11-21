import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Tab(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li class="mr-2">
          <a
            href="#"
            aria-current="page"
            class="inline-block px-2.5 py-1 text-blue-600 bg-gray-300 rounded-t-lg"
          >
            Nam
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            class="inline-block px-2.5 py-1 rounded-t-lg hover:text-gray-600 hover:bg-gray-200"
          >
            Nữ
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            class="inline-block px-2.5 py-1 rounded-t-lg hover:text-gray-600 hover:bg-gray-200"
          >
            Les
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            class="inline-block px-2.5 py-1 rounded-t-lg hover:text-gray-600 hover:bg-gray-200"
          >
            Gay
          </a>
        </li>
      </ul>
    </div>
  );
}
