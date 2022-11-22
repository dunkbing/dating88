import { useState } from "preact/hooks";

export function ProfileMenu() {
  const [showMenu, setShowMenu] = useState<"" | "hidden">("hidden");

  function handleClick() {
    if (showMenu) setShowMenu("");
    else setShowMenu("hidden");
  }

  return (
    <div class="flex justify-center">
      <div class="relative">
        <button
          class="block h-12 w-12 rounded-full overflow-hidden focus:outline-none"
          onClick={handleClick}
        >
          <img
            class="h-full w-full object-cover"
            src="https://eu.ui-avatars.com/api/?name=John&size=1000"
            alt="avatar"
          />
        </button>
        <div
          class={`absolute right-0 w-40 mt-2 bg-white border rounded shadow-xl ${showMenu}`}
        >
          <a
            href="#"
            class="transition-colors duration-200 block px-4 py-2 text-base text-gray-900 rounded hover:bg-purple-500 hover:text-white"
          >
            Settings
          </a>
          <hr></hr>
          <a
            href="#"
            class="transition-colors duration-200 block px-4 py-2 text-base text-gray-900 rounded hover:bg-purple-500 hover:text-white"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
