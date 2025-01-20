import { supabase } from "@/utils/supabase/client";

// 새 채팅방 생성하거나 혹은 기존에 채팅방이 있다면 가져오는 로직
export const newChatApi = async (user1Id: string, user2Id: string) => {
  const { data: existingChat, error: existingError } = await supabase
    .from('chats')
    .select('*')
    .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
    .maybeSingle();

  if (existingError && existingError.code !== 'PGRST116') {
    console.error('Error fetching chat:', existingError);
    return {data: null, error:existingError};
  }

    if (existingChat) {
    return { data: { ...existingChat, is_new: false }, error: null }; // 기존 채팅방 반환
  }

  // 새 채팅방 생성
  const { data: newChat, error: newChatError } = await supabase
    .from('chats')
    .insert([{ user1_id: user1Id, user2_id: user2Id }])
    .select()
    .single();

  if (newChatError) {
    console.error('Error creating chat:', newChatError);
    return { data: null, error: newChatError };
  }

  return { data: { ...newChat, is_new: true }, error: null };;
};
