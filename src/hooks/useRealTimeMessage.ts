import { Database } from '@/types/supabase';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type Message = Database['public']['Tables']['messages']['Row'];

export const useRealTimeMessages = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    // 채널에서 테이터베이스에 입력된 값을 RealTime을 이용해 구독하는 로직
    const messageSubscription = supabase
      .channel('realtime:messages')
      .on('postgres_changes', {
        event: 'INSERT', 
        schema: 'public',
        table: 'messages'
      }, (payload) => {
        const newMessage = payload.new as Message
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }
    ).on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const updatedMessage = payload.new as Message;
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [chatId]);

  return messages;
};