import { Tab } from "@/components/Tab.tsx";
import SecondaryProfileCard from "@/islands/SecondaryProfileCard.tsx";

interface Props {
  title: string;
}

export default function SecondaryTab(props: Props) {
  return (
    <div class="w-full">
      <p class="flex-grow-1 font-bold text-xl text-pink-700">{props.title}</p>
      <Tab />
      <SecondaryProfileCard />
      <SecondaryProfileCard />
    </div>
  );
}
