'use client';

import { RightArrowForChatIcon, UnReadMarkIcon } from '@/components/icons/Icons';
import type { ChatRoom } from '@/types/chatType';

interface ChatListProps {
  chatRooms: (ChatRoom & { otherNickname: string | null })[];
  unreadMessagesMap: { [chatId: string]: boolean };
  onSelectRoom: (chatId: string, otherNickname: string) => void;
}

const ChatList = ({ chatRooms, unreadMessagesMap, onSelectRoom }: ChatListProps) => {
  // const [rooms, setRooms] = useState(chatRooms); // UI 업데이트를 위한 로컬 상태

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

  // const handleDeleteRoom = async (chatId: string) => {
  //   const result = await Swal.fire({
  //     title: '채팅방 삭제',
  //     text: '이 채팅방을 삭제하시겠습니까?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: '삭제',
  //     cancelButtonText: '취소'
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       await supabase.from('chats').delete().eq('id', chatId);
  //       Swal.fire('삭제 완료!', '채팅방이 삭제되었습니다.', 'success');

  //       setRooms((prevRooms) => prevRooms.filter((room) => room.id !== chatId));
  //     } catch (error) {
  //       console.error('Error deleting chat room:', error);
  //       Swal.fire('오류!', '채팅방 삭제 중 문제가 발생했습니다.', 'error');
  //     }
  //   }
  // };

  // const longPressOptions = {
  //   threshold: 1500 // 롱프레스 시간 (1.5초)
  // };

  return (
    <div>
      {chatRooms.map((room) => {
        const lastMessage = room.messages?.[room.messages.length - 1];
        const hasUnreadMessagesMap = unreadMessagesMap[room.id];

        // const bindLongPress = useLongPress(() => handleDeleteRoom(room.id), longPressOptions);
        return (
          <button
            key={room.id}
            // {...bindLongPress}
            className="mb-2 flex w-full flex-col border-b p-2 text-left"
            onClick={() => onSelectRoom(room.id, room.otherNickname || '사용자가 없습니다.')}
          >
            {/* 상단: 닉네임과 날짜+화살표 */}
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-semibold text-black">{room.otherNickname || '사용자가 없습니다.'}</span>
              {hasUnreadMessagesMap && <UnReadMarkIcon />}
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
