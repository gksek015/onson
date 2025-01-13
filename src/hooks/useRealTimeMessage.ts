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

    const messageSubscription = supabase
      .channel('realtime:messages')
      .on('postgres_changes', {
         event: 'INSERT', 
        schema: 'public',
        table: 'messages'
      }, (payload) => console.log(payload)
    ).subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [chatId]);

  return messages;
};