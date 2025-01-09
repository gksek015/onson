import { supabase } from "@/utils/supabase/client";

const sendMessage = async(chatId:number, userId:string, content:string) => {
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