import { supabase } from "@/utils/supabase/client"

export const deleteChatRoom = async (chatId: string) => {
    const { data, error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)

    if (error) {
        console.log('채팅방 삭제중 에러가 생겼습니다.', error.message)
        throw error
    }

    return data
}
