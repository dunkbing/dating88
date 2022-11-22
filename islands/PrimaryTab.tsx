import { Profile } from "@/utils/types.ts";
import { useState } from "preact/hooks";
import PrimaryProfileCard from "@/islands/PrimaryProfileCard.tsx";

interface Props {
  title: string;
  profiles?: Profile[];
}

export default function PrimaryTab(props: Props) {
  const [profiles, setProfiles] = useState(props.profiles);
  return (
    <div class="w-full">
      <p class="flex-grow-1 font-bold text-xl text-pink-700">{props.title}</p>
      {profiles?.map((p) => (
        <PrimaryProfileCard
          key={p.id}
          id={p.id}
          fullname={p.fullname}
          gender={p.gender}
          status={p.status}
          target={p.target}
          description={p.description}
          city={p.city}
          dateOfBirth={p.dateOfBirth}
        />
      ))}
    </div>
  );
}
