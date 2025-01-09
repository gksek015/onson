import { supabase } from "@/utils/supabase/client";

// 채팅방 목록 가져오기
export const getChatRoomList = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('chats')
      .select('*, messages(content, created_at)')
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    return [];
  }
};