import { RightArrowForChatIcon } from '@/components/icons/Icons';
import type { ChatRoom } from '@/types/chatType';

interface ChatListProps {
  chatRooms: (ChatRoom & { otherNickname: string | null })[];
  onSelectRoom: (chatId: string, otherNickname: string) => void;
}

const ChatList = ({ chatRooms, onSelectRoom }: ChatListProps) => {
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

  return (
    <div>
      {chatRooms.map((room) => {
        const lastMessage = room.messages?.[room.messages.length - 1];

        return (
          <button
            key={room.id}
            className="mb-2 flex w-full flex-col border-b p-2 text-left"
            onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')}
          >
            {/* 상단: 닉네임과 날짜+화살표 */}
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-semibold text-black">{room.otherNickname || '사용자가 없습니다.'}</span>
              <div className="flex-end flex items-center space-x-2 text-right">
                <p className="text-xs text-gray-500">
                  {lastMessage?.created_at ? formatDate(lastMessage.created_at) : ''}
                </p>
                <RightArrowForChatIcon />
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="mt-2">
              <p className="truncate text-sm text-black">{lastMessage?.content || '메시지가 없습니다.'}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
