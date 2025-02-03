import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type ChatRoom = {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  last_message?: string | null;
  last_message_created_at?: string | null;
  messages: {
    id: string;
    chat_id: string;
    content: string;
    created_at: string;
    user_id: string;
  }[];
};

export const useRealTimeChatRooms = (userId: string) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchChatRooms = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select(`
          id, user1_id, user2_id, created_at,
          messages(id, chat_id, content, created_at, user_id)
        `)
        .eq('user1_id', userId)
        .or(`user2_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching chat rooms:', error);
        return;
      }

      const roomsWithLastMessage: ChatRoom[] = data.map((room) => ({
        ...room,
        messages: Array.isArray(room.messages) ? room.messages : [],
        last_message: room.messages.length ? room.messages[room.messages.length - 1].content : null,
        last_message_created_at: room.messages.length ? room.messages[room.messages.length - 1].created_at : null,
      }));

      setChatRooms(roomsWithLastMessage);
    };

    fetchChatRooms();

    // 실시간 메시지 업데이트 감지
    const messageSubscription = supabase
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new;

          setChatRooms((prevRooms) => {
            const updatedRooms: ChatRoom[] = prevRooms.map((room) => {
              if (room.id === newMessage.chat_id) {
                return {
                  ...room,
                  messages: [...room.messages, {
                    id: newMessage.id,
                    chat_id: newMessage.chat_id,
                    content: newMessage.content,
                    created_at: newMessage.created_at,
                    user_id: newMessage.user_id
                  }], // 올바른 타입 유지
                  last_message: newMessage.content,
                  last_message_created_at: newMessage.created_at,
                };
              }
              return room;
            });

            // 최신 메시지가 있는 채팅방을 최상단으로 정렬
            return updatedRooms.sort(
              (a, b) =>
                new Date(b.last_message_created_at || b.created_at).getTime() -
                new Date(a.last_message_created_at || a.created_at).getTime()
            );
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [userId]);

  return chatRooms;
};
