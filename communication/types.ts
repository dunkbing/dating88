import { z } from "zod";

export type ChannelMessage =
  | RoomTextChannelMessage
  | RoomIsTypingChannelMessage;

export interface RoomTextChannelMessage extends MessageView {
  kind: "text";
}

export interface RoomIsTypingChannelMessage {
  kind: "typing";
  from: UserView;
}

export interface UserView {
  name: string;
  avatarUrl: string;
}

export interface MessageView {
  message: string;
  from: UserView;
  createdAt: string;
}

export interface RoomView {
  roomId: number;
  name: string;
  lastMessageAt: string;
}

export interface ApiTextMessage {
  kind: "text";
  roomId: number;
  message: string;
}

export interface ApiIsTypingMessage {
  kind: "typing";
  roomId: number;
}

export type ApiSendMessage = ApiTextMessage | ApiIsTypingMessage;

export const roomCreate = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

export type RoomCreate = z.infer<typeof roomCreate>;
