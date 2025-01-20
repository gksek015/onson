import { supabase } from "@/utils/supabase/client";

export const getMarkMessageAsRead = async (chatId: string, userId: string) => {
     const { error } = await supabase
      .from('messages')
      .update({ read: true }) // 읽음 상태로 업데이트
      .eq('chat_id', chatId) // 특정 채팅방
      .neq('user_id', userId); // 상대방 메시지

    if (error) throw error;
    return true;
}