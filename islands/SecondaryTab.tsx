import { Tab } from '@/components/Tab.tsx';
import SecondaryProfileCard from '@/islands/SecondaryProfileCard.tsx';
import { Profile } from '@/utils/types.ts';

interface Props {
  title: string;
  profiles?: Profile[];
}

export default function SecondaryTab({ title, profiles }: Props) {
  return (
    <div class="w-full">
      <p class="flex-grow-1 font-bold text-xl text-pink-700">{title}</p>
      <Tab />
      {profiles?.map((p) => (
        <SecondaryProfileCard
          key={p.id}
          id={p.id}
          fullname={p.fullname}
          gender={p.gender}
          status={p.status}
          target={p.target}
          description={p.description}
          city={p.city}
        />
      ))}
    </div>
  );
}
