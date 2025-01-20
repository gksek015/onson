import type { Database } from "./supabase";

export type ChatRoom = Database['public']['Tables']['chats']['Row'] & {
  messages: { id?:string, content: string; created_at: string }[];
};

export type chatRoomWithNickname = ChatRoom & {
  otherNickname?:string
}