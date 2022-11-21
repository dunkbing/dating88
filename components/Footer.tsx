import { JSX } from "preact";

export function Footer(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <footer class="p-4 flex items-center justify-between md:p-6 border-t-4 border-pink-500 max-w-screen-xl mx-auto">
      <span class="text-sm text-gray-500 sm:text-center">
        © 2022{" "}
        <a href="https://flowbite.com/" class="hover:underline">
          Hen ho
        </a>
        . All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" class="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
