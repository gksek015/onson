'use client';

import { RightArrowForChatIcon, UnReadMarkIcon } from '@/components/icons/Icons';
import type { ChatRoom } from '@/types/chatType';

interface ChatListProps {
  chatRooms: (ChatRoom & { otherNickname: string | null })[];
  onSelectRoom: (chatId: string, otherNickname: string) => void;
  unreadMessagesMap: { [chatId: string]: boolean };
}

const ChatList = ({ chatRooms, onSelectRoom, unreadMessagesMap }: ChatListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    };
    return date.toLocaleDateString('ko-KR', options); // 한국어 형식으로 변환
  };

  const sortedRooms = chatRooms.sort((a, b) => {
    const aLastMessage = a.messages?.[a.messages.length - 1]?.created_at || '';
    const bLastMessage = b.messages?.[b.messages.length - 1]?.created_at || '';
    return new Date(bLastMessage).getTime() - new Date(aLastMessage).getTime();
  });

  return (
    <div>
      {sortedRooms.map((room) => {
        const lastMessage = room.messages?.[room.messages.length - 1];
        const hasUnreadMessagesMap = unreadMessagesMap[room.id];

        return (
          <button
            key={room.id}
            className="mb-2 mt-2 flex w-full flex-col px-5 py-3 text-left"
            onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')}
          >
            {/* 상단: 닉네임과 날짜+화살표 */}
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-medium text-black">{room.otherNickname || '사용자가 없습니다.'}</span>
              {hasUnreadMessagesMap && <UnReadMarkIcon />}
              <div className="flex-end flex items-center space-x-2 text-right">
                <span className="text-xs text-[#]">
                  {lastMessage?.created_at ? formatDate(lastMessage.created_at) : ''}
                </span>
                <RightArrowForChatIcon />
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="mt-[6px]">
              <span className="truncate text-base font-normal text-black">
                {lastMessage?.content || '메시지가 없습니다.'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
