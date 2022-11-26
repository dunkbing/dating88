import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Input(
  props: JSX.HTMLAttributes<HTMLInputElement> & { label: string },
) {
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-gray-800 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {props.label}
      </label>
      <input
        {...props}
        disabled={!IS_BROWSER || props.disabled}
        class={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:(opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-200 shadow-none) ${
          props.class ?? ""
        }`}
      />
    </div>
  );
}
