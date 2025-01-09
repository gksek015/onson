'use client';

//대화방 디자인
// TODO: 여기서부터 경민님 작업하시면 됩니당. 대화방 목록 만드시고 각 메세지 방 클릭시 넘어가는 채팅방 UI는 Chatroom 이용하시면 됩니다.
import type { Database } from '@/types/supabase';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import ChatList from './chatRoom/ChatList';
import ChatMessage from './chatRoom/ChatMessage';

interface ChatInBoxProps {
  userId: string;
}

interface ChatRoom {
  id: string;
  user1_id: string;
  messages?: { content: string }[];
  created_at: string;
}

type Message = Database['public']['Tables']['messages']['Row'];

// interface Message {
//   user_id: string;
//   content: string;
//   chat_room_id: string;
// }

const ChatInBox = ({ userId }: ChatInBoxProps) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*, messages(content, created_at)')
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching chat rooms:', error);
        return;
      }

      console.log(userId);

      setChatRooms(data || []);
    };

    fetchChatRooms();
  }, [userId]);

  useEffect(() => {
    if (!selectedRoomId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('chat_id, content, created_at, id, read, user_id')
        .eq('chat_room_id', selectedRoomId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();
  }, [selectedRoomId]);

  return selectedRoomId ? <ChatMessage /> : <ChatList chatRooms={chatRooms} onSelectRoom={setSelectedRoomId} />;
};

export default ChatInBox;
