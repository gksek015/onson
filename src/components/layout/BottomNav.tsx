'use client';

import useModal from '@/hooks/ui/useModal';
import { useUserStore } from '@/utils/store/userStore';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatBoxModal from '../chatbox/ChatBoxModal';
import { HomePillIcon, MessageCircleIcon, MessageStrokeIcon, NoteStrokeIcon, PencilPlusIcon } from '../icons/Icons';

const BottomNav = () => {
  const router = useRouter();
  const { isOpen, toggleModal } = useModal();
  const { user } = useUserStore();
  const { unreadMessages, subscribeToRealtimeMessages, refetch } = useUnreadMessageStore();

  // 실시간 메시지 구독
  useEffect(() => {
    if (user?.id) {
      refetch(user.id); // 초기 데이터 로드
      subscribeToRealtimeMessages(user.id); // 실시간 동기화
    }
  }, [user?.id, refetch, subscribeToRealtimeMessages]);

  const hasUnreadMessages = Object.values(unreadMessages).some((val) => val);

  return (
    <>
      <nav className="fixed bottom-0 flex w-full justify-around border-t bg-white p-4">
        {/* 홈 버튼 */}
        <button type="button" onClick={() => router.push('/')} className="flex flex-col items-center">
          <HomePillIcon />
          <span className="text-sm font-bold text-black">홈</span>
        </button>

        {/* 게시글 작성 버튼 */}
        <button type="button" onClick={() => router.push('/create')} className="flex flex-col items-center">
          <PencilPlusIcon />
          <span className="text-sm font-bold text-black">봉사 요청</span>
        </button>

        {/* 게시글 리스트 페이지 이동 버튼 */}
        <button type="button" onClick={() => router.push('/list')} className="flex flex-col items-center">
          <NoteStrokeIcon />
          <span className="text-sm font-bold text-black">봉사 찾기</span>
        </button>

        {/* 채팅모달을 열기 위한 버튼 */}
        <button type="button" onClick={toggleModal} className="flex flex-col items-center">
          {hasUnreadMessages ? <MessageCircleIcon /> : <MessageStrokeIcon />}
          <span className="text-sm font-bold text-black">Chat</span>
        </button>
      </nav>
      {/* 모달열리는 부분 */}
      {isOpen && <ChatBoxModal onClose={toggleModal} />}
    </>
  );
};

export default BottomNav;
