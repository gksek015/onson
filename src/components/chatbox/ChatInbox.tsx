'use client';

//대화방 디자인
// TODO: 여기서부터 경민님 작업하시면 됩니당. 대화방 목록 만드시고 각 메세지 방 클릭시 넘어가는 채팅방 UI는 Chatroom 이용하시면 됩니다.

import { useUnreadMessage } from '@/hooks/useUnreadMessage';
import { getChatUserNickname } from '@/lib/chats/getChatNickname';
import { getChatRoomList } from '@/lib/chats/getChatRoomList';
import { subscribeToMessages } from '@/lib/chats/subscribeToMessage';
import type { ChatRoom } from '@/types/chatType';
import { useCallback, useEffect, useState } from 'react';
import ChatList from './chatRoom/ChatList';
import ChatMessage from './chatRoom/ChatMessage';

interface ChatInBoxProps {
  userId: string;
  selectedChatId: string | null;
  onEnterChatRoom: (chatId: string, nickname: string) => void;
  onBackToList: () => void;
}

const ChatInBox = ({ selectedChatId, userId, onEnterChatRoom, onBackToList }: ChatInBoxProps) => {
  const [chatRooms, setChatRooms] = useState<(ChatRoom & { otherNickname: string | null })[]>([]);
  const { unreadMessages, isError } = useUnreadMessage(userId);

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
  }, [userId]);

  // 실시간 동기화 처리
  useEffect(() => {
    fetchChatRooms();

    const unsubscribe = subscribeToMessages(
      (newMessage) => {
        setChatRooms((prevChatRooms) => {
          const chatRoomIndex = prevChatRooms.findIndex((room) => room.id === newMessage.chat_id);

          if (chatRoomIndex !== -1) {
            const updatedChatRooms = [...prevChatRooms];
            const updatedRoom = {
              ...updatedChatRooms[chatRoomIndex],
              messages: [...(updatedChatRooms[chatRoomIndex].messages || []), newMessage]
            };
            updatedChatRooms[chatRoomIndex] = updatedRoom;

            return [updatedRoom, ...updatedChatRooms.filter((_, idx) => idx !== chatRoomIndex)];
          }

          return prevChatRooms;
        });
      },
      (updatedMessage) => {
        setChatRooms((prevChatRooms) => {
          const chatRoomIndex = prevChatRooms.findIndex((room) => room.id === updatedMessage.chat_id);

          if (chatRoomIndex !== -1) {
            const updatedChatRooms = [...prevChatRooms];
            const updatedMessages = updatedChatRooms[chatRoomIndex].messages?.map((msg) =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            );

            updatedChatRooms[chatRoomIndex] = {
              ...updatedChatRooms[chatRoomIndex],
              messages: updatedMessages
            };

            return updatedChatRooms;
          }

          return prevChatRooms;
        });
      }
    );

    return () => unsubscribe();
  }, [fetchChatRooms]);

  if (isError) return <p>Error loading chat rooms</p>;
  if (!chatRooms.length) return <p className="text-black">No chats available.</p>;

  return selectedChatId ? (
    <ChatMessage selectedChatId={selectedChatId} userId={userId} onBackToList={onBackToList} />
  ) : (
    <ChatList
      chatRooms={chatRooms}
      onSelectRoom={(chatId, nickname) => {
        onEnterChatRoom(chatId, nickname);
      }}
      unreadMessagesMap={unreadMessages || {}}
    />
  );
};

export default ChatInBox;
