interface ChatRoom {
  id: string;
  user1_id: string;
  messages?: { content: string }[];
  created_at: string;
}

interface ChatListProps {
  chatRooms: ChatRoom[];
  onSelectRoom: (id: string) => void;
}

const ChatList = ({ chatRooms, onSelectRoom }: ChatListProps) => (
  <div className="flex h-full flex-col bg-gray-100">
    <header className="bg-blue-600 p-4 text-white">
      <h1 className="text-lg font-bold">채팅방 목록</h1>
    </header>
    <div className="flex-1 overflow-y-auto">
      {chatRooms.map((room) => (
        <div
          key={room.id}
          className="flex cursor-pointer items-center border-b p-4 hover:bg-gray-200"
          onClick={() => onSelectRoom(room.id)}
        >
          <div className="flex-1">
            <h2 className="font-bold">{room.user1_id}</h2>
            <p className="text-gray-600">{room.messages?.[0]?.content || '새 메시지가 없습니다.'}</p>
          </div>
          <span className="text-xs text-gray-500">{new Date(room.created_at).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ChatList;
