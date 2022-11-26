import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

interface Props {
  label: string;
  items: { value: string | number; display: string }[];
}

export function Selection(
  props: Props & JSX.HTMLAttributes<HTMLSelectElement>,
) {
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-gray-800 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {props.label}
      </label>
      <select
        {...props}
        id="cities"
        class={`bg-gray-100 border border-purple-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 border-gray-600 placeholder-gray-400 text-black disabled:(opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-200 shadow-none) ${
          props.class ?? ""
        }`}
        disabled={props.disabled}
      >
        {props.items.map((item) => (
          <option value={item.value}>{item.display}</option>
        ))}
      </select>
    </div>
  );
}
