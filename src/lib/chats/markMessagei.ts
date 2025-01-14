import { supabase } from "@/utils/supabase/client";

// 메시지 읽음 처리
export const markMessagesAsRead = async (chatRoomId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('chat_room_id', chatRoomId)
      .neq('user_id', userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
  }
};

// 읽지 않은 메시지 수 가져오기
export const getUnreadMessageCount = async (chatRoomId: string, userId: string) => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('chat_room_id', chatRoomId)
      .neq('user_id', userId)
      .eq('read', false);

    if (error) throw error;

    return count || 0;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }
};