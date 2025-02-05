import { supabase } from "@/utils/supabase/client"

export const deleteChatRoom = async (chatId: string) => {
    const { data, error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)

    if (error) {
        throw error
    }

    return data
}
