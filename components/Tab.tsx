import { useCallback, useState } from "preact/hooks";
import { tw } from "twind";
import { Gender, genderMap } from "../utils/types.ts";

interface Props {
  onSelectTab?: (tab: Gender) => void;
}

export const Tab = (props: Props) => {
  const selectedStyle =
    tw`inline-block px-2.5 py-1 text-blue-600 bg-gray-300 rounded-t-lg`;
  const normalStyle =
    tw`inline-block px-2.5 py-1 rounded-t-lg hover:text-gray-600 hover:bg-gray-200`;
  const menus = [Gender.MALE, Gender.FEMALE, Gender.GAY, Gender.LES];

  const [selected, setSelected] = useState(0);

  const handleClick = useCallback((i: number, gender: Gender) => {
    return () => {
      setSelected(i);
      props.onSelectTab?.(gender);
    };
  }, []);

  return (
    <div>
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        {menus.map((menu, i) => (
          <li class="mr-2" onClick={handleClick(i, menu)}>
            <a
              href="#"
              aria-current="page"
              class={`${
                selected === i ? selectedStyle : normalStyle
              } capitalize`}
            >
              {genderMap[menu]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
