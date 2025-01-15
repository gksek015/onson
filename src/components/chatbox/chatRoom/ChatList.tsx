import type { ChatRoom } from '@/types/chatType';

interface ChatListProps {
  chatRooms: (ChatRoom & { otherNickname: string | null })[];
  onSelectRoom: (chatId: string, otherNickname: string) => void;
}

const ChatList = ({ chatRooms, onSelectRoom }: ChatListProps) => {
  return (
    <div className="p-4">
      {chatRooms.map((room) => {
        const lastMessage = room.messages?.[room.messages.length - 1];

        return (
          <button
            key={room.id}
            className="mb-2 flex w-full items-center justify-between text-left"
            onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')} // 닉네임 전달
          >
            <div>
              <p className="text-sm font-bold text-black">{room.otherNickname || '사용자가 없습니다.'}</p>
              <p className="w-60 truncate text-sm text-black">{lastMessage?.content || '메시지가 없습니다.'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-black">
                {lastMessage?.created_at
                  ? new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </p>
              <span className="text-gray text-xl">›</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
