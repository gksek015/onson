import { supabase } from "@/utils/supabase/client";

export const checkUnreadMessages = async (userId: string): Promise<{ [chatRoomId: string]: boolean }> => {
    const { data, error } = await supabase
      .from('messages')
      .select('chat_id, read, user_id')
      .eq('read', false) // 읽지 않은 메시지
      .neq('user_id', userId); // 상대방이 보낸 메시지

    if (error) {
      throw error;
    }

    // 읽지 않은 메시지가 있는 채팅방을 true로 반환
    const unreadMap: { [chatRoomId: string]: boolean } = {};
    data?.forEach((message) => {
      unreadMap[message.chat_id] = true;
    });

    return unreadMap;
};