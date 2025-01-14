'use client';

//대화방 디자인
// TODO: 여기서부터 경민님 작업하시면 됩니당. 대화방 목록 만드시고 각 메세지 방 클릭시 넘어가는 채팅방 UI는 Chatroom 이용하시면 됩니다.

import { getChatRoomList } from '@/lib/chats/getChatRoomList';
import { useEffect, useState } from 'react';
import ChatMessage from './chatRoom/ChatMessage';

interface ChatInBoxProps {
  userId: string;
}

const ChatInBox = ({ userId }: ChatInBoxProps) => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const rooms = await getChatRoomList(userId);
      setChatRooms(rooms);
      setLoading(false);
    };

    fetchChatRooms();
  }, [userId]);

  if (loading) return <p>Loading chat rooms...</p>;

  if (!chatRooms.length) return <p className="p-4 text-gray-500">No chats available.</p>;

  return selectedChatId ? (
    <ChatMessage chatId={selectedChatId} userId={userId} onBack={() => setSelectedChatId(null)} />
  ) : (
    <div className="p-4">
      {chatRooms.map((room) => (
        <button
          key={room.id}
          className="mb-2 block w-full border p-2 text-left"
          onClick={() => setSelectedChatId(room.id)}
        >
          Chat with {room.user1_id === userId ? room.user2_id : room.user1_id}
        </button>
      ))}
    </div>
  );
};

export default ChatInBox;
