import { genderMap, Profile, statusMap, targetMap } from "@/utils/types.ts";
import { getAge } from "@/utils/mod.ts";

type Props = Profile;

function Link(props: { to?: string; text?: string }) {
  return (
    <a
      href={`/find-partner/${props.to}`}
      class="text-blue-600 dark:text-blue-500 hover:underline"
    >
      {props.text}
    </a>
  );
}

export default function PrimaryProfileCard(props: Props) {
  const links = [
    [props.gender, genderMap[props.gender!]],
    [props.status, statusMap[props.status!]],
    [props.target, targetMap[props.target!]],
    [props.city?.slug, props.city?.name],
  ];

  return (
    <>
      <div className="w-full h-auto flex my-2 bg-pink-50 rounded-xl">
        <div class="w-1/4 my-auto">
          <img class="w-2/3 rounded-xl mx-auto" src="/haibara.webp" />
        </div>
        <div className="w-3/4 border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t rounded-2xl lg:rounded-r pl-4">
          <a
            class="text-xl text-purple-800 font-semibold capitalize"
            href={`/profile/${props.id}`}
          >
            {`${props.lastname} ${props.firstname}`} -{" "}
            {getAge(props.dateOfBirth)}
          </a>
          <div class="font-medium flex items-center space-x-2">
            {links.map(([to, text], i) => (
              <>
                <Link to={to} text={text} />
                {i !== links.length - 1 && <p>-</p>}
              </>
            ))}
          </div>
          <p className="w-5/6 text-gray-900 text-lg">{props.description}</p>
        </div>
      </div>
    </>
  );
}
