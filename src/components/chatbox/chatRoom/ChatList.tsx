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
  onDeleteRoom: (chatId: string) => void;
}

const ChatList = ({ chatRooms, onSelectRoom, onDeleteRoom, unreadMessagesMap }: ChatListProps) => {
  const [slidRoomId, setSlidRoomId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);

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
    const result = await Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '이 작업은 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      try {
        await deleteChatRoom(chatId);
        Swal.fire('삭제됨!', '채팅방이 삭제되었습니다.', 'success');
        onDeleteRoom(chatId);
      } catch (error) {
        console.error(error);
        Swal.fire('오류!', '채팅방 삭제 중 문제가 발생했습니다.', 'error');
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTouchStartX(e.touches[0].clientX); // 터치 시작 위치 저장
  };

  // 모바일 터치 이동 이벤트
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, roomId: string) => {
    e.stopPropagation();
    const touchEndX = e.changedTouches[0].clientX;

    if (touchStartX !== null) {
      const deltaX = touchStartX - touchEndX;

      if (deltaX > 50) {
        // 새로운 채팅방 슬라이드 시 기존 슬라이드 해제
        setSlidRoomId((prev) => (prev === roomId ? prev : roomId));
      } else if (deltaX < -50 && slidRoomId === roomId) {
        // 반대로 슬라이드하면 해제
        setSlidRoomId(null);
      }
    }
  };

  // 데스크탑 마우스 이벤트(슬라이드 동작)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, roomId: string) => {
    if (mouseStartX !== null) {
      const deltaX = mouseStartX - e.clientX;
      if (deltaX > 50)
        setSlidRoomId(roomId); // 오른쪽으로 슬라이드
      else if (deltaX < -50 && slidRoomId === roomId) setSlidRoomId(null); // 왼쪽으로 슬라이드 해제
    }
  };

  const handleMouseUp = () => {
    setMouseStartX(null);
  };

  return (
    <div className="w-full">
      {sortedRooms.map((room) => {
        const lastMessage = room.messages?.[room.messages.length - 1];
        const hasUnreadMessagesMap = unreadMessagesMap[room.id];
        const isSlid = slidRoomId === room.id;

        return (
          <div
            key={room.id}
            className="relative mb-2 mt-2 flex w-full flex-col overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => handleTouchMove(e, room.id)}
            onTouchEnd={() => setTimeout(() => setSlidRoomId(null), 3000)} //자동 해제 (3초 후)
            onMouseDown={handleMouseDown}
            onMouseMove={(e) => handleMouseMove(e, room.id)}
            onMouseUp={handleMouseUp}
          >
            <div className="relative flex w-full">
              {/* 채팅 리스트 (오른쪽으로 80px만큼 이동) */}
              <button
                className={`w-full min-w-0 px-5 py-3 text-left transition-transform duration-200 ease-in-out ${
                  isSlid ? 'translate-x-[-80px]' : 'translate-x-0'
                }`}
                onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')}
              >
                {/* 상단: 닉네임과 날짜+화살표 */}
                <div className="flex w-full items-center justify-between">
                  <div className="flex min-w-0 flex-1 items-center">
                    <span className="truncate text-lg font-medium text-black">
                      {room.otherNickname || '사용자가 없습니다.'}
                    </span>
                    {hasUnreadMessagesMap && <UnReadMarkIcon />}
                  </div>
                  <div className="flex-end flex items-center space-x-2 text-right">
                    <span className="text-xs text-[#989898]">
                      {lastMessage?.created_at ? formatDate(lastMessage.created_at) : ''}
                    </span>
                    <RightArrowForChatIcon />
                  </div>
                </div>

                {/* 메시지 영역 */}
                <div className="mt-[6px] flex w-full items-center overflow-hidden">
                  <span className="truncate text-ellipsis whitespace-nowrap text-base font-normal text-[#111]">
                    {lastMessage?.content || '메시지가 없습니다.'}
                  </span>
                </div>
              </button>

              {/* 삭제 버튼 - 슬라이드된 공간 안에 표시 */}
              <div
                className={`absolute right-0 top-0 flex h-full w-[80px] items-center justify-center bg-[#F66B55] text-white transition-all duration-300 ${
                  isSlid ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <button className="h-full w-full" onClick={() => handleDeleteRoom(room.id)}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
