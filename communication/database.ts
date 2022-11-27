import { ResourceLoader } from "../utils/loader.ts";
// import * as postgres from '$postgres';
import * as supabase from "supabase";
import type { MessageView, RoomCreate } from "./types.ts";
import { supabaseClient } from "../utils/supabase.ts";
import { tables } from "../utils/types.ts";

export interface DatabaseUser {
  userId: number;
  userName: string;
  avatarUrl: string;
}

export class Database {
  #client: supabase.SupabaseClient;

  constructor(client?: supabase.SupabaseClient) {
    this.#client = client ?? supabaseClient;
    // supabase.createClient(
    //   Deno.env.get('SUPABASE_API_URL')!,
    //   Deno.env.get('SUPABASE_ANON_KEY')!
    // );
  }

  async getUserByAccessTokenOrThrow(
    accessToken: string,
  ): Promise<DatabaseUser> {
    const user = await this.getUserByAccessToken(accessToken);
    if (user == null) {
      throw new Error("Could not find user with access token.");
    }
    return user;
  }

  async getUserByAccessToken(
    accessToken: string,
  ): Promise<DatabaseUser | undefined> {
    const { data, error } = await this.#client
      .from("users")
      .select("id,username,avatar_url")
      .eq("access_token", accessToken);
    if (error) {
      throw new Error(error.message);
    }
    if (data.length === 0) {
      return undefined;
    }
    return {
      userId: data[0].id,
      userName: data[0].username,
      avatarUrl: data[0].avatar_url,
    };
  }

  async getRooms() {
    const { data, error } = await this.#client
      .from("rooms_with_activity")
      .select("id,name,last_message_at");
    if (error) {
      throw new Error(error.message);
    }
    return data.map((d) => ({
      roomId: d.id,
      name: d.name,
      lastMessageAt: d.last_message_at,
    }));
  }

  async getRoomByCode(roomCode: string) {
    const { data, error } = await this.#client
      .from(tables.rooms)
      .select("id, code, name, created_at")
      .eq("code", roomCode)
      .single();
    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      createdAt: data.created_at,
    };
  }

  async ensureRoom(room: RoomCreate) {
    const insert = await this.#client.from(tables.rooms).upsert(room).single();

    if (insert.error) {
      if (insert.error.code !== "23505") {
        throw new Error(insert.error.message);
      }

      const get = await this.#client
        .from(tables.rooms)
        .select("id,code,name")
        .eq("code", room.code)
        .single();
      if (get.error) {
        throw new Error(get.error.message);
      }
      return get.data;
    }

    return insert.data;
  }

  async insertMessage(message: {
    text: string;
    roomId: number;
    profileId: number;
  }) {
    await this.#client.from(tables.messages).insert({
      message: message.text,
      room_id: message.roomId,
      profile_id: message.profileId,
    });
  }

  async getRoomMessages(roomId: number): Promise<MessageView[]> {
    const { data, error } = await this.#client
      .from(tables.messages)
      .select("id,message,profiles(id,user_id,firstname,lastname),created_at")
      .eq("room_id", roomId);

    if (error) {
      throw new Error(error.message);
    }

    return data.map((m) => ({
      message: m.message,
      from: {
        name: `${m.profiles?.lastname} ${m.profiles?.firstname}`,
        avatarUrl: m.profiles?.avatar_url,
      },
      createdAt: m.created_at,
    }));
  }
}

export const databaseLoader = new ResourceLoader<Database>({
  load() {
    return Promise.resolve(new Database());
  },
});
