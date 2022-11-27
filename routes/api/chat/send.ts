import { Handlers } from "$fresh/server.ts";
import { emojify } from "emojify";
import { databaseLoader } from "@/communication/database.ts";
import { RoomChannel } from "@/communication/channel.ts";
import { badWordsCleanerLoader } from "@/utils/bad-word.ts";
import { ApiSendMessage } from "@/communication/types.ts";
import { getProfile } from "../../../utils/profile.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const database = await databaseLoader.getInstance();
    const data = (await req.json()) as ApiSendMessage & {
      profileId: number;
      name: string;
    };
    const channel = new RoomChannel(data.roomId);
    const from = {
      name: data.name,
      avatarUrl: "",
    };

    if (data.kind === "typing") {
      channel.sendIsTyping(from);
      channel.close();
      return new Response("OK");
    }

    const badWordsCleaner = await badWordsCleanerLoader.getInstance();
    const message = emojify(badWordsCleaner.clean(data.message));

    channel.sendText({
      message: message,
      from,
      createdAt: new Date().toISOString(),
    });
    channel.close();

    await database.insertMessage({
      text: message,
      roomId: data.roomId,
      profileId: data.profileId,
    });

    return new Response("OK");
  },
};
