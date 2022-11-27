import { HandlerContext } from "$fresh/server.ts";
import { emojify } from "emojify";
import { databaseLoader } from "@/communication/database.ts";
import { RoomChannel } from "@/communication/channel.ts";
import { badWordsCleanerLoader } from "@/utils/bad-word.ts";
import { ApiSendMessage } from "@/communication/types.ts";

export async function handler(
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> {
  // const accessToken = getCookies(req.headers)["deploy_chat_token"];
  // if (!accessToken) {
  //   return new Response("Not signed in", { status: 401 });
  // }
  const database = await databaseLoader.getInstance();
  // const user = await database.getUserByAccessTokenOrThrow(accessToken);
  const user = { userId: 1, userName: "binh", avatarUrl: "" };
  const data = (await req.json()) as ApiSendMessage;
  const channel = new RoomChannel(data.roomId);
  const from = {
    name: user.userName,
    avatarUrl: user.avatarUrl,
  };

  if (data.kind === "isTyping") {
    // Send `is typing...` indicator.
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
    profileId: user.userId,
  });

  return new Response("OK");
}
