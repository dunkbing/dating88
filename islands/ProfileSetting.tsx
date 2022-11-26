import { useEffect, useState } from "preact/hooks";
import {
  Education,
  educationMap,
  Gender,
  genderMap,
  Profile,
  Status,
  statusMap,
  Target,
  targetMap,
} from "@/utils/types.ts";
import { Selection } from "@/components/Selection.tsx";
import Input from "@/components/Input.tsx";
import ColoredButton from "@/components/Button.tsx";
import { City } from "@/utils/cities.ts";
import { lang } from "@/utils/i18n.ts";

interface Props {
  profile?: Profile;
}

export default function ({ profile }: Props) {
  const [cities, setCities] = useState<Pick<City, "id" | "name">[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const fetchCities = () => {
    setLoadingCities(true);
    setCities([]);
    void fetch(`/api/get-cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setLoadingCities(false);
      });
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0">
      <div className="rounded-t bg-white mb-0 pl-10 py-4">
        <div className="text-center flex justify-between">
          <h6 className="text-purple-700 text-xl font-bold">
            {lang("profileInfo")}
          </h6>
        </div>
      </div>
      <div className="flex-auto px-10 py-5">
        <form action="/profile/setting" method="POST" id="profile-setting">
          <div className="flex flex-wrap mt-3">
            <div className="w-full lg:w-full px-4">
              <Input
                label="Email"
                disabled
                type="email"
                value={profile?.email}
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <Input
                label={lang("firstname")}
                placeholder={lang("firstname")}
                name="firstname"
                type="text"
                required
                value={profile?.firstname}
              />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <Input
                label={lang("lastname")}
                placeholder={lang("lastname")}
                name="lastname"
                type="text"
                required
                value={profile?.lastname}
              />
            </div>
            <div className="w-6/12 px-4">
              <Input
                label={lang("dateOfBirth")}
                placeholder={lang("dateOfBirth")}
                name="dateOfBirth"
                type="date"
                value={profile?.dateOfBirth}
              />
            </div>
            <div className="w-6/12 px-4">
              <Selection
                label={lang("gender")}
                name="gender"
                items={[
                  { display: genderMap[Gender.MALE], value: Gender.MALE },
                  { display: genderMap[Gender.FEMALE], value: Gender.FEMALE },
                ]}
                value={profile?.gender}
                // form="profile-setting"
              />
            </div>
            <div className="w-6/12 px-4">
              <Selection
                label={lang("city")}
                name="cityId"
                type="number"
                items={cities.map((city) => ({
                  display: city.name,
                  value: city.id,
                }))}
                disabled={loadingCities}
                value={profile?.city?.id}
              />
            </div>
            <div className="w-6/12 px-4">
              <Selection
                label={lang("education")}
                name="education"
                items={[
                  {
                    display: educationMap[Education.HIGH_SCHOOL],
                    value: Education.HIGH_SCHOOL,
                  },
                  {
                    display: educationMap[Education.COLLEGE],
                    value: Education.COLLEGE,
                  },
                  {
                    display: educationMap[Education.MASTER],
                    value: Education.MASTER,
                  },
                  {
                    display: educationMap[Education.PHD],
                    value: Education.PHD,
                  },
                ]}
                value={profile?.education}
              />
            </div>
            <div className="w-6/12 px-4">
              <Selection
                label={lang("status")}
                name="status"
                items={[
                  { display: statusMap[Status.SINGLE], value: Status.SINGLE },
                  { display: statusMap[Status.MARRIED], value: Status.MARRIED },
                  {
                    display: statusMap[Status.DIVORCED],
                    value: Status.DIVORCED,
                  },
                  {
                    display: statusMap[Status.HAVING_LOVER],
                    value: Status.HAVING_LOVER,
                  },
                  {
                    display: statusMap[Status.HAVING_FAMILY],
                    value: Status.HAVING_FAMILY,
                  },
                ]}
                value={profile?.status}
              />
            </div>
            <div className="w-6/12 px-4">
              <Selection
                label={lang("target")}
                name="target"
                items={[
                  {
                    display: targetMap[Target.FRIENDSHIP],
                    value: Target.FRIENDSHIP,
                  },
                  {
                    display: targetMap[Target.LONG_TERM_LOVER],
                    value: Target.LONG_TERM_LOVER,
                  },
                  {
                    display: targetMap[Target.SHORT_TERM_LOVER],
                    value: Target.SHORT_TERM_LOVER,
                  },
                  {
                    display: targetMap[Target.JUST_CHATTING],
                    value: Target.JUST_CHATTING,
                  },
                ]}
                value={profile?.target}
              />
            </div>
            <div className="w-6/12 px-4">
              <Input
                label={lang("height")}
                placeholder={lang("height")}
                name="height"
                type="number"
                required
                value={profile?.height}
              />
            </div>
            <div className="w-6/12 px-4">
              <Input
                label={lang("weight")}
                placeholder={lang("weight")}
                name="weight"
                type="number"
                required
                value={profile?.weight}
              />
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  {lang("profileDesc")}
                </label>
                <textarea
                  className="border-0 px-3 py-3 placeholder-gray-300 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  name="description"
                  type="text"
                  rows={4}
                  value={profile?.description}
                  form="profile-setting"
                />
              </div>
            </div>
            <div class="mx-auto">
              <ColoredButton type="submit" class="mx-auto">
                {lang("save")}
              </ColoredButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
