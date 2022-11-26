import { useCallback, useEffect, useState } from "preact/hooks";
import { Tab } from "@/components/Tab.tsx";
import SecondaryProfileCard from "@/islands/SecondaryProfileCard.tsx";
import { Gender, Profile } from "@/utils/types.ts";
import { Skeleton } from "../components/Skeleton.tsx";

interface Props {
  title: string;
  type: "most-views" | "newest";
}

export default function SecondaryTab(props: Props) {
  const { title, type } = props;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = (gender: Gender) => {
    setLoading(true);
    setProfiles([]);
    void fetch(`/api/get-profiles?gender=${gender}&type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(Gender.MALE);
  }, []);

  const handleChangeTab = useCallback((gender: Gender) => {
    fetchData(gender);
  }, []);

  return (
    <div class="w-full">
      <p class="flex-grow-1 font-bold text-xl text-pink-700">{title}</p>
      <Tab onSelectTab={handleChangeTab} />
      {loading && <Skeleton />}
      {profiles?.map((p) => (
        <SecondaryProfileCard
          key={p.id}
          id={p.id}
          lastname={p.lastname}
          firstname={p.firstname}
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
