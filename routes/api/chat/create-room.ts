import { Handlers, RouteConfig } from "$fresh/server.ts";
import { RoomChannel } from "@/communication/channel.ts";
import { databaseLoader } from "@/communication/database.ts";
import { RoomCreate } from "../../../communication/types.ts";
import { getRoomCode } from "../../../utils/mod.ts";
import { getProfileByUserId } from "../../../utils/profile.ts";

export const handler: Handlers = {
  async POST(_req, ctx) {
    const database = await databaseLoader.getInstance();
    const userIds = (await _req.json()) as string[];
    const [p1, p2] = await Promise.all([
      getProfileByUserId(userIds[0]),
      getProfileByUserId(userIds[1]),
    ]);
    if (!p1 || !p2) return Response.json({ message: "" }, { status: 400 });
    const data = await database.ensureRoom({
      code: getRoomCode(userIds),
      name: `${p1.firstname} - ${p2.firstname}`,
    });

    return Response.json(data, {
      status: 201,
    });
  },
};
