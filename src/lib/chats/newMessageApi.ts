import { createClient } from "@/utils/supabase/client";

const sendMessage = async (chatId: string, userId: string, content: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, user_id: userId, content }]);

  if (error) {
    console.error('Error sending message:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

export default sendMessage