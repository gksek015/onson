import type { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

// 채팅방 목록 가져오기
export type ChatRoom = Database['public']['Tables']['chats']['Row'] & {
  messages: { content: string; created_at: string }[];
  user1: { id: string; nickname: string; profile_img_url: string | null };
  user2: { id: string; nickname: string; profile_img_url: string | null };
};

export const getChatRoomList = async (userId: string): Promise<ChatRoom[]> => {
  const { data, error } = await supabase
    .from('chats')
    .select(`
      id,
      user1_id,
      user2_id,
      created_at,
      messages(content, created_at),
      user1:users!chats_user1_id_fkey(id, nickname, profile_img_url),
      user2:users!chats_user2_id_fkey(id, nickname, profile_img_url) 
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching chat rooms:", error);
      return [];
  }
  
  return (data || []) as ChatRoom[];
};