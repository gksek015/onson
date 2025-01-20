import { supabase } from '@/utils/supabase/client';
import { create } from 'zustand';

type UnreadMessagesState = {
  unreadMessages: { [chatRoomId: string]: boolean };
  isPending: boolean;
  isError: boolean;
  refetch: (userId: string) => Promise<void>;
  subscribeToRealtimeMessages: (userId: string) => void;
};

export const useUnreadMessageStore = create<UnreadMessagesState>((set, get) => ({
  unreadMessages: {},
  isPending: true,
  isError: false,

  // 사용자 관련 채팅방만 관리
  refetch: async (userId: string) => {
    if (!userId) return;

    set({ isPending: true });

    try {
      // 사용자가 관련된 채팅방 ID 가져오기
      const { data: chatRooms, error: chatRoomError } = await supabase
        .from('chats')
        .select('id')
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

      if (chatRoomError || !chatRooms) throw chatRoomError;

      const chatRoomIds = chatRooms.map((room) => room.id);

      // 안 읽은 메시지 상태 가져오기
      const { data: messages, error: messageError } = await supabase
        .from('messages')
        .select('chat_id, read, user_id')
        .in('chat_id', chatRoomIds)
        .eq('read', false)
        .neq('user_id', userId);

      if (messageError) throw messageError;

      const unreadMap: { [chatRoomId: string]: boolean } = {};
      messages?.forEach((message) => {
        unreadMap[message.chat_id] = true;
      });

      set({ unreadMessages: unreadMap, isError: false });
    } catch {
      set({ isError: true });
    } finally {
      set({ isPending: false });
    }
  },

  subscribeToRealtimeMessages: (userId: string) => {
    const subscription = supabase
      .channel('realtime:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMessage = payload.new as { chat_id: string; user_id: string; read: boolean };

        // 본인과 관련된 채팅방의 새 메시지만 처리
        if (newMessage.user_id !== userId) {
          get().refetch(userId);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, (payload) => {
        const updatedMessage = payload.new as { chat_id: string; read: boolean };

        // 메시지 읽음 상태 변경 시, 관련 채팅방만 갱신
        if (updatedMessage.read) {
          get().refetch(userId);
        }
      })
      .subscribe();

    return () => supabase.removeChannel(subscription);
  },
}));
