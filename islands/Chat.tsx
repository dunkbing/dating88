import { useEffect, useReducer, useRef, useState } from "preact/hooks";
import twas from "twas";
import type { MessageView, UserView } from "@/communication/types.ts";
import { server } from "@/communication/server.ts";
import { getAvatar } from "@/utils/mod.ts";
import { Profile } from "../utils/types.ts";

export default function Chat({
  roomId,
  profile,
  roomName,
  initialMessages,
  user,
}: {
  roomId: number;
  profile: Profile;
  roomName: string;
  initialMessages: MessageView[];
  user: UserView;
}) {
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, addMessage] = useReducer<MessageView[], MessageView>(
    (msgs, msg) => [...msgs, msg],
    initialMessages,
  );
  const [typing, setTyping] = useState<
    {
      user: UserView;
      interval: number;
    } | null
  >(null);

  useEffect(() => {
    Notification.requestPermission();

    const subscription = server.subscribeMessages(roomId, (msg) => {
      switch (msg.kind) {
        case "typing": {
          if (typing) {
            clearInterval(typing.interval);
          }
          const interval = setTimeout(() => {
            setTyping(null);
          }, 5000);
          setTyping({
            user: msg.from,
            interval,
          });
          break;
        }
        case "text":
          addMessage(msg);
          new Notification(`New message from ${msg.from.name}`, {
            body: msg.message,
            icon: msg.from.avatarUrl,
          });
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const container = messagesContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages.length]);

  const send = () => {
    if (input === "") {
      return;
    }
    server.sendMessage({
      roomId,
      profileId: Number(profile.id),
      name: `${profile.lastname} ${profile.firstname}`,
      message: input,
    });
    setInput("");
  };

  return (
    <>
      <div class="w-5/6 md:w-1/2 h-2/3 rounded-2xl mb-5 pl-6 flex flex-col">
        <div class="h-8 flex-none pl-1 pr-7 pt-2 mb-10 flex justify-between items-center">
          <a
            href="/chat"
            class="h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-200 rounded-2xl"
          >
            <img src="/arrow.svg" alt="Left Arrow" />
          </a>
          <div class="font-medium text-lg">{roomName}</div>
          <div />
        </div>

        <div class="flex-auto overflow-y-scroll" ref={messagesContainer}>
          {messages.map((msg) => <Message message={msg} />)}
        </div>

        <div class="h-6 mt-1">
          {typing && (
            <div class="text-sm text-gray-400">
              <span class="text-gray-800">{typing.user.name}</span> is typing...
            </div>
          )}
        </div>
      </div>
      <div class="w-5/6 md:w-1/2 h-16 flex-none rounded-full flex items-center">
        <ChatInput
          input={input}
          onInput={(input) => {
            setInput(input);
            server.sendIsTyping(
              roomId,
              Number(profile.id),
              `${profile.lastname} ${profile.firstname}`,
            );
          }}
          onSend={send}
        />
      </div>
    </>
  );
}

function ChatInput({
  input,
  onInput,
  onSend,
}: {
  input: string;
  onInput: (input: string) => void;
  onSend: () => void;
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Message"
        class="block mx-6 w-full bg-transparent outline-none focus:text-gray-700"
        value={input}
        onInput={(e) => onInput(e.currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <button onClick={onSend} class="mx-3 p-2 hover:bg-gray-200 rounded-2xl">
        <svg
          class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </>
  );
}

function Message({ message }: { message: MessageView }) {
  return (
    <div class="flex mb-4">
      <img
        src={getAvatar(message.from.name)}
        alt={`${message.from.name}'s avatar`}
        class="mr-4 w-9 h-9 rounded-full"
      />
      <div>
        <p class="flex items-baseline mb-1.5">
          <span class="mr-2 font-bold">{message.from.name}</span>
          <span class="text-xs text-gray-400 font-extralight">
            {twas(new Date(message.createdAt).getTime())}
          </span>
        </p>
        <p class="text-sm text-gray-800">{message.message}</p>
      </div>
    </div>
  );
}
