import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

interface Props {
  label: string;
  items: { value: string | number; display: string }[];
}

export function Selection(props: Props) {
  const [value, setValue] = useState(props.items?.[0].value);
  const handleChange: JSX.GenericEventHandler<HTMLSelectElement> = (e) => {
    setValue((e.target as HTMLSelectElement)?.value);
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-pink-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {props.label}
      </label>
      <select
        id="countries"
        value={value}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
      >
        {props.items.map((item) => (
          <option value={item.value}>{item.display}</option>
        ))}
      </select>
    </div>
  );
}
