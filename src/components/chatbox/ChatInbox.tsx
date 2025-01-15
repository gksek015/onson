'use client';

//대화방 디자인
// TODO: 여기서부터 경민님 작업하시면 됩니당. 대화방 목록 만드시고 각 메세지 방 클릭시 넘어가는 채팅방 UI는 Chatroom 이용하시면 됩니다.

import { getChatUserNickname } from '@/hooks/getChatNickname';
import { getChatRoomList } from '@/hooks/getChatRoomList';
import type { ChatRoom } from '@/types/chatType';
import { useEffect, useState } from 'react';
import ChatList from './chatRoom/ChatList';
import ChatMessage from './chatRoom/ChatMessage';

interface ChatInBoxProps {
  userId: string;
  onEnterChatRoom: (chatId: string, nickname: string) => void;
}

const ChatInBox = ({ userId, onEnterChatRoom }: ChatInBoxProps) => {
  const [chatRooms, setChatRooms] = useState<(ChatRoom & { otherNickname: string | null })[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBackToList = () => {
    setSelectedChatId(null);
  };

  const handleSelectRoom = (chatId: string, otherNickname: string) => {
    setSelectedChatId(chatId);
    onEnterChatRoom(chatId, otherNickname);
  };

  useEffect(() => {
    const fetchChatRooms = async () => {
      const rooms = await getChatRoomList(userId);
      const roomsWithNicknames = await Promise.all(
        rooms.map(async (room) => {
          const otherUserId = room.user1_id === userId ? room.user2_id : room.user1_id;
          const otherNickname = await getChatUserNickname(room.id, otherUserId);
          return { ...room, otherNickname };
        })
      );
      setChatRooms(roomsWithNicknames);
      setLoading(false);
    };

    fetchChatRooms();
  }, [selectedChatId, userId]);

  if (loading) return <p>Loading chat rooms...</p>;

  if (!chatRooms.length) return <p className="text-black">No chats available.</p>;

  return selectedChatId ? (
    <ChatMessage chatId={selectedChatId} userId={userId} />
  ) : (
    <ChatList chatRooms={chatRooms} onSelectRoom={handleSelectRoom} />
  );
};

export default ChatInBox;
