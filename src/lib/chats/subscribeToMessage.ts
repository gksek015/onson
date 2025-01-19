import type { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

type Message = Database['public']['Tables']['messages']['Row'];

export const subscribeToMessages = (
  onNewMessage: (message: Message) => void,
  onUpdateMessage: (message: Message) => void
) => {
  const subscription = supabase
    .channel('realtime:messages')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      (payload) => {
        const newMessage = payload.new as Message; // 명시적 타입 캐스팅
        onNewMessage(newMessage);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'messages' },
      (payload) => {
        const updatedMessage = payload.new as Message; // 명시적 타입 캐스팅
        onUpdateMessage(updatedMessage);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
