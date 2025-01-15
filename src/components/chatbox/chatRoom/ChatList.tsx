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
            className="mb-2 flex w-full items-center justify-between border-2 p-2 text-left"
            onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')} // 닉네임 전달
          >
            <div>
              <p className="text-lg font-semibold text-black">{room.otherNickname || '사용자가 없습니다.'}</p>
              <p className="w-60 truncate text-sm text-black">{lastMessage?.content || '메시지가 없습니다.'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-black">{lastMessage?.created_at ? formatDate(lastMessage.created_at) : ''}</p>
              <span className="text-xl text-black">›</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
