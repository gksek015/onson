'use client';

//대화방 디자인
// TODO: 여기서부터 경민님 작업하시면 됩니당. 대화방 목록 만드시고 각 메세지 방 클릭시 넘어가는 채팅방 UI는 Chatroom 이용하시면 됩니다.

import { getChatRoomList, type ChatRoom } from '@/hooks/getChatRoomList';
import { useEffect, useState } from 'react';
import ChatMessage from './chatRoom/ChatMessage';

interface ChatInBoxProps {
  userId: string;
}

const ChatInBox = ({ userId }: ChatInBoxProps) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const rooms = await getChatRoomList(userId);
      console.log(rooms);
      setChatRooms(rooms);
      setLoading(false);
    };

    fetchChatRooms();
  }, [userId]);

  if (loading) return <p>Loading chat rooms...</p>;

  if (!chatRooms.length) return <p className="p-4 text-black">No chats available.</p>;

  return selectedChatId ? (
    <ChatMessage chatId={selectedChatId} userId={userId} onBack={() => setSelectedChatId(null)} />
  ) : (
    <div className="p-4">
      {chatRooms.map((room) => {
        const lastMessage = room.messages?.[0];
        const otherUserNickname = room.user1_id === userId ? room.user2.nickname : room.user1.nickname;

        return (
          <button
            key={room.id}
            className="mb-2 flex w-full items-center justify-between border p-4 text-left"
            onClick={() => setSelectedChatId(room.id)}
          >
            <div>
              {/* 상대방의 닉네임 */}
              <p className="text-sm font-bold text-black">{otherUserNickname}</p>

              {/* 마지막 메시지 내용 (길면 ... 처리) */}
              <p className="w-60 truncate text-sm text-black">{lastMessage?.content || '메시지가 없습니다.'}</p>
            </div>

            <div className="text-right">
              {/* 메시지 보낸 시간 */}
              <p className="text-xs text-black">
                {lastMessage?.created_at
                  ? new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </p>
              <span className="text-xl font-bold text-black">›</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatInBox;
