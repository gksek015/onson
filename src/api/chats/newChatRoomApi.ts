import { createClient } from "@/utils/supabase/client";

const newChatApi = async (user1Id: string, user2Id: string) => {
  const supabase = createClient()
  const { data: existingChat, error: existingError } = await supabase
    .from('chats')
    .select('*')
    .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
    .single();

  if (existingError && existingError.code !== 'PGRST116') {
    console.error('Error fetching chat:', existingError);
    return null;
  }

  if (existingChat) {
    return existingChat; // 기존 채팅방 반환
  }

  // 새 채팅방 생성
  const { data: newChat, error: newChatError } = await supabase
    .from('chats')
    .insert([{ user1_id: user1Id, user2_id: user2Id }])
    .single();

  if (newChatError) {
    console.error('Error creating chat:', newChatError);
    return null;
  }

  return newChat;
};

export default newChatApi;
