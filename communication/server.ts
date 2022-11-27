import type {
  ApiIsTypingMessage,
  ApiTextMessage,
  ChannelMessage,
} from "./types.ts";

export class Server {
  subscribeMessages(
    roomId: number,
    onMessage: (message: ChannelMessage) => void,
  ) {
    const events = new EventSource(`/api/chat/connect/${roomId}`);
    const listener = (e: MessageEvent) => {
      const msg = JSON.parse(e.data) as ChannelMessage;
      onMessage(msg);
    };
    events.addEventListener("message", listener);
    return {
      unsubscribe() {
        events.removeEventListener("message", listener);
      },
    };
  }

  sendMessage({
    roomId,
    profileId,
    name,
    message,
  }: {
    roomId: number;
    profileId: number;
    name: string;
    message: string;
  }) {
    const data: ApiTextMessage & { profileId: number; name: string } = {
      kind: "text",
      message,
      roomId,
      profileId,
      name,
    };
    fetch("/api/chat/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  sendIsTyping(roomId: number, profileId: number, name: string) {
    const data: ApiIsTypingMessage & { profileId: number; name: string } = {
      kind: "typing",
      roomId,
      profileId,
      name,
    };
    fetch("/api/chat/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async createRoom(name: string) {
    const res = await fetch("/api/create_room", {
      method: "POST",
      body: name,
    });
    const text = await res.text();
    if (!res.ok) {
      alert(text); // Nothing fancy
      throw new Error(text);
    }
    return text;
  }
}

export const server = new Server();
