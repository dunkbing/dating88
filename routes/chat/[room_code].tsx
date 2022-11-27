import { Handler, HandlerContext, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCookies } from "$std/http/cookie.ts";
import { databaseLoader } from "@/communication/database.ts";
import Chat from "@/islands/Chat.tsx";
import type { MessageView, UserView } from "@/communication/types.ts";
import { Layout } from "../../islands/Nav.tsx";
import { ComponentChildren } from "preact";

interface Data {
  messages: MessageView[];
  roomId: number;
  roomName: string;
  user: UserView;
}

export const handler: Handler<Data> = async (
  req: Request,
  ctx: HandlerContext<Data>,
): Promise<Response> => {
  // Get cookie from request header and parse it
  // const accessToken = getCookies(req.headers)["deploy_chat_token"];
  // if (!accessToken) {
  //   return Response.redirect(new URL(req.url).origin);
  // }
  const database = await databaseLoader.getInstance();
  // const user = await database.getUserByAccessTokenOrThrow(accessToken);
  const user = { userName: "binh", avatarUrl: "" };
  const { room_code } = ctx.params;
  if (!room_code) {
    return new Response("Invalid room code", { status: 400 });
  }

  const room = await database.getRoomByCode(room_code);
  const messages = await database.getRoomMessages(room.id);

  return ctx.render({
    messages,
    roomId: room.id,
    roomName: room.name,
    user: {
      name: user.userName,
      avatarUrl: user.avatarUrl,
    },
  });
};

export default function ({ data, params }: PageProps<Data>) {
  return (
    <Layout>
      <div class="flex flex-col justify-center items-center w-full h-screen bg-pink-100 children:(bg-[#F9F9F9] border-1 border-gray-300)">
        <Head>
          <title>{data.roomName} | Dating88 Chat</title>
        </Head>
        <Chat
          roomId={+data.roomId}
          initialMessages={data.messages}
          roomName={data.roomName}
          user={data.user}
        />
      </div>
    </Layout>
  );
}
