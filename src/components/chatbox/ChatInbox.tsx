'use client';

//대화방 디자인
// TODO: 여기서부터 경민님 작업하시면 됩니당. 대화방 목록 만드시고 각 메세지 방 클릭시 넘어가는 채팅방 UI는 Chatroom 이용하시면 됩니다.

import { getChatUserNickname } from '@/lib/chats/getChatNickname';
import { getChatRoomList } from '@/lib/chats/getChatRoomList';
import type { ChatRoom } from '@/types/chatType';
import { useEffect, useState } from 'react';
import ChatList from './chatRoom/ChatList';
import ChatMessage from './chatRoom/ChatMessage';

interface ChatInBoxProps {
  userId: string;
  selectedChatId: string | null;
  unreadMessagesMap: { [chatId: string]: boolean };
  onEnterChatRoom: (chatId: string, nickname: string) => void;
  onBackToList: () => void;
}

const ChatInBox = ({ selectedChatId, userId, unreadMessagesMap, onEnterChatRoom, onBackToList }: ChatInBoxProps) => {
  const [chatRooms, setChatRooms] = useState<(ChatRoom & { otherNickname: string | null })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const rooms = await getChatRoomList(userId);
      const roomsWithNicknames = await Promise.all(
        rooms.map(async (room) => {
          // 상대방 닉네임 가져오기
          const otherNickname = await getChatUserNickname(room.id, userId); // 여전히 userId 기준으로 처리
          return { ...room, otherNickname };
        })
      );
      setChatRooms(roomsWithNicknames);
      setLoading(false);
    };

    fetchChatRooms();
  }, [userId]);

  if (loading) return <p>Loading chat rooms...</p>;

  if (!chatRooms.length) return <p className="text-black">No chats available.</p>;

  return selectedChatId ? (
    <ChatMessage selectedChatId={selectedChatId} userId={userId} onBackToList={onBackToList} />
  ) : (
    <ChatList chatRooms={chatRooms} onSelectRoom={onEnterChatRoom} unreadMessagesMap={unreadMessagesMap} />
  );
};

export default ChatInBox;
