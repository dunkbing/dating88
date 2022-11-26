import { Handlers } from "$fresh/server.ts";
import { Profile } from "@/utils/types.ts";
import { redirect } from "@/utils/mod.ts";
import { getCities } from "../../utils/city.ts";
import { City } from "../../utils/cities.ts";

interface Query {
  profiles: Profile[];
}

export const handler: Handlers<Query> = {
  async GET(_req, _ctx) {
    try {
      const data = await getCities();
      const cities: Pick<City, "id" | "name">[] = data?.map((d) => ({
        id: d.id,
        name: d.name,
      })) || [];

      return Response.json(cities);
    } catch (_error) {
      return redirect("/error");
    }
  },
};
