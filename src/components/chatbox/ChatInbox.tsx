'use client';

//대화방 디자인

import { getChatUserNickname } from '@/lib/chats/getChatNickname';
import { getChatRoomList } from '@/lib/chats/getChatRoomList';
import type { ChatRoom } from '@/types/chatType';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
import { useCallback, useEffect, useState } from 'react';
import ChatList from './chatRoom/ChatList';
import ChatMessage from './chatRoom/ChatMessage';
import Spinner from './chatUI/ChatSpinner';

interface ChatInBoxProps {
  userId: string;
  selectedChatId: string | null;
  onEnterChatRoom: (chatId: string, nickname: string) => void;
  onBackToList: () => void;
}

const ChatInBox = ({ selectedChatId, userId, onEnterChatRoom, onBackToList }: ChatInBoxProps) => {
  const [chatRooms, setChatRooms] = useState<(ChatRoom & { otherNickname: string | null })[]>([]);
  const [isPending, setIsPending] = useState(true);
  const { unreadMessages, isError, refetch } = useUnreadMessageStore();

  // 채팅방 목록 로드 및 최신 메시지 업데이트
  const fetchChatRooms = useCallback(async () => {
    const rooms = await getChatRoomList(userId);
    const roomsWithNicknames = await Promise.all(
      rooms.map(async (room) => {
        const otherNickname = await getChatUserNickname(room.id, userId);
        return { ...room, otherNickname };
      })
    );
    setChatRooms(roomsWithNicknames);
    setIsPending(false);
  }, [userId]);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  const handleSelectRoom = (chatId: string, nickname: string) => {
    onEnterChatRoom(chatId, nickname);
    refetch(userId); // 상태 갱신
  };

  const handleDeleteRoom = (chatId: string) => {
    setChatRooms((prevRooms) => prevRooms.filter((room) => room.id !== chatId));
  };

  if (isError) return <p>Error loading chat rooms</p>;

  return (
    <div className="relative h-full">
      {isPending ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : selectedChatId ? (
        <ChatMessage selectedChatId={selectedChatId} userId={userId} onBackToList={onBackToList} />
      ) : chatRooms.length === 0 ? ( // 채팅방이 없을 경우 메시지 표시
        <div className="flex h-full flex-col items-center justify-center text-[#343434]">
          <p>채팅을 보내거나 받으면 채팅이 여기에 표시됩니다.</p>
        </div>
      ) : (
        <>
          <ChatList
            chatRooms={chatRooms}
            onDeleteRoom={handleDeleteRoom}
            onSelectRoom={handleSelectRoom}
            unreadMessagesMap={unreadMessages || {}}
          />
        </>
      )}
    </div>
  );
};

export default ChatInBox;
