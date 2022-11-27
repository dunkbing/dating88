import { Handler, HandlerContext, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { databaseLoader } from "@/communication/database.ts";
import Chat from "@/islands/Chat.tsx";
import type { MessageView, UserView } from "@/communication/types.ts";
import { Layout } from "@/islands/Nav.tsx";
import { getProfileByUserId } from "@/utils/profile.ts";
import { Profile, Supabase } from "@/utils/types.ts";

interface Data {
  messages: MessageView[];
  roomId: number;
  roomName: string;
  user: Supabase.User;
  userView: UserView;
  profile?: Profile;
}

export const handler: Handler<Data> = async (
  req: Request,
  ctx: HandlerContext<Data>,
): Promise<Response> => {
  const database = await databaseLoader.getInstance();
  const user = ctx.state.user as Supabase.User;
  const profile = await getProfileByUserId(user?.id);
  console.log(user, profile);
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
    user,
    profile,
    userView: {
      name: `${profile?.firstname}`,
      avatarUrl: profile?.avatarUrl,
    },
  });
};

export default function ({ data, params }: PageProps<Data>) {
  console.log(data);
  return (
    <Layout user={data.user} profile={data.profile}>
      <div class="flex flex-col justify-center items-center w-full h-screen bg-pink-100 children:(bg-[#F9F9F9] border-1 border-gray-300)">
        <Head>
          <title>{data.roomName} | Dating88 Chat</title>
        </Head>
        <Chat
          roomId={+data.roomId}
          profile={data.profile || {}}
          initialMessages={data.messages}
          roomName={data.roomName}
          user={data.userView}
        />
      </div>
    </Layout>
  );
}
