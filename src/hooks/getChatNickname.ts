import { supabase } from "@/utils/supabase/client";

export const getChatUserNickname = async (chatId:string, currentUserId:string):Promise<string | null> => {
    const { data, error } = await supabase
        .from('chats')
        .select(`
        user1_id,
        user2_id,
        user1:users!chats_user1_id_fkey(nickname),
        user2:users!chats_user2_id_fkey(nickname)
        `)
        .eq('id', chatId)
        .single();

    if (error) {
        console.error('Error fetching nickname:', error);
        return null;
    }

    // 현재 유저가 user1_id라면 user2의 닉네임, 반대면 user1의 닉네임 반환
    return currentUserId === data.user1_id ? data.user2.nickname : data.user1.nickname;
}