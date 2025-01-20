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
  refetch: async (userId: string) => {
    if (!userId) return;

    set({ isPending: true });

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('chat_id, read, user_id')
        .eq('read', false)
        .neq('user_id', userId);

      if (error) throw error;

      const unreadMap: { [chatRoomId: string]: boolean } = {};
      data?.forEach((message) => {
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

        if (newMessage.user_id !== userId) {
          get().refetch(userId); // 새 메시지가 오면 상태 갱신
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, (payload) => {
        const updatedMessage = payload.new as { chat_id: string; read: boolean };

        if (updatedMessage.read) {
          get().refetch(userId); // 읽음 상태가 변경되면 상태 갱신
        }
      })
      .subscribe();

    return () => supabase.removeChannel(subscription); // 구독 해제
  },
}));
