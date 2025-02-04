import { supabase } from "@/utils/supabase/client";

// 메세지를 전송해주는 라이브러리리
export const sendMessage = async (chatId: string, userId: string, content: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ chat_id: chatId, user_id: userId, content }])
      .select() // 삽입된 데이터를 즉시 반환받음

  if (error) {
    console.error('Error sending message:', error);
    return { data: null, error };
  }

  return { data, error: null };
};