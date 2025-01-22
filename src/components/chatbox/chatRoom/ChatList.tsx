'use client';

import { RightArrowForChatIcon, UnReadMarkIcon } from '@/components/icons/Icons';
import { deleteChatRoom } from '@/lib/chats/deleteChatRoom';
import type { ChatRoom } from '@/types/chatType';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface ChatListProps {
  chatRooms: (ChatRoom & { otherNickname: string | null })[];
  onSelectRoom: (chatId: string, otherNickname: string) => void;
  unreadMessagesMap: { [chatId: string]: boolean };
}

const ChatList = ({ chatRooms, onSelectRoom, unreadMessagesMap }: ChatListProps) => {
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);

  const formatDate = (created_at: string | null) => {
    if (!created_at) return '날짜 없음'; // 예외 처리

    const date = new Date(created_at); // created_at을 Date 객체로 변환
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];

    return `${year}-${month}-${day} ${weekday}`;
  };

  const sortedRooms = chatRooms.sort((a, b) => {
    const aLastMessage = a.messages?.[a.messages.length - 1]?.created_at || '';
    const bLastMessage = b.messages?.[b.messages.length - 1]?.created_at || '';
    return new Date(bLastMessage).getTime() - new Date(aLastMessage).getTime();
  });

  const handleDeleteRoom = async (chatId: string) => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '이 작업은 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteChatRoom(chatId);
          Swal.fire('삭제됨!', '채팅방이 삭제되었습니다.', 'success');
          window.location.reload(); // 간단히 새로고침
        } catch (error) {
          Swal.fire('오류!', '채팅방 삭제 중 문제가 발생했습니다.', 'error');
        }
      }
    });
  };

  return (
    <>
      {sortedRooms.map((room) => {
        const lastMessage = room.messages?.[room.messages.length - 1];
        const hasUnreadMessagesMap = unreadMessagesMap[room.id];

        return (
          <button
            key={room.id}
            className="mb-2 mt-2 flex w-full flex-col px-5 py-3 text-left"
            onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')}
            // {...(() => setDeletingRoomId(room.id), { delay: 2000 })}
          >
            {/* 상단: 닉네임과 날짜+화살표 */}
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-1 items-center">
                <span className="text-lg font-medium text-black">{room.otherNickname || '사용자가 없습니다.'}</span>
                <span className="ml-2">{hasUnreadMessagesMap && <UnReadMarkIcon />}</span>
              </div>
              <div className="flex-end flex items-center space-x-2 text-right">
                <span className="text-xs text-[#989898]">
                  {lastMessage?.created_at ? formatDate(lastMessage.created_at) : ''}
                </span>
                <RightArrowForChatIcon />
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="over mt-[6px] flex w-full items-center overflow-hidden">
              <span className="truncate text-ellipsis whitespace-nowrap text-base font-normal text-[#111]">
                {lastMessage?.content || '메시지가 없습니다.'}
              </span>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default ChatList;
