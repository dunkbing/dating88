import { genderMap, Profile, statusMap, targetMap } from '@/utils/types.ts';

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
    [props.gender, genderMap[props.gender]],
    [props.status, statusMap[props.status]],
    [props.target, targetMap[props.target]],
    [props.city?.slug, props.city?.name],
  ];

  return (
    <>
      <div className="w-full lg:flex my-2">
        <div class="w-36 h-auto">
          <img
            class="w-full rounded-xl"
            src="https://tailwindcss.com/img/card-left.jpg"
          />
        </div>
        <div className="border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t bg-white rounded-b lg:rounded-r pl-4">
          <a class="text-xl text-purple-800 font-semibold" href="/profile/1">
            {props.fullname} - 32
          </a>
          <div class="font-medium flex items-center space-x-2">
            {links.map(([to, text], i) => (
              <>
                <Link to={to} text={text} />
                {i !== links.length - 1 && <p>-</p>}
              </>
            ))}
          </div>
          <p className="text-gray-900 text-lg">{props.description}</p>
        </div>
      </div>
    </>
  );
}
