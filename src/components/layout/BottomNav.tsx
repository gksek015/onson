'use client';

import useModal from '@/hooks/ui/useModal';
import { useUserStore } from '@/utils/store/userStore';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ChatBoxModal from '../chatbox/ChatBoxModal';
import {
  HomePillIcon,
  HomeStrokeIcon,
  MessageCircleIcon,
  MessagePillIcon,
  MessageStrokeIcon,
  NotePillIcon,
  NoteStrokeIcon,
  PencilPlusIcon
} from '../icons/Icons';

const BottomNav = () => {
  const pathname = usePathname();
  const { isOpen, toggleModal, closeModal } = useModal();
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

  // 채팅 아이콘 메모이제이션
  const getChatIcon = () => {
    if (isOpen) {
      return hasUnreadMessages ? <MessageCircleIcon /> : <MessagePillIcon />;
    }
    return hasUnreadMessages ? <MessageCircleIcon /> : <MessageStrokeIcon />;
  };

  // 네비게이션 핸들러
  const handleNavClick = (path: string) => {
    closeModal(); // 모달 닫기
    if (pathname !== path) {
      window.location.href = path; // 경로 변경
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 flex w-full justify-around border-t bg-white p-4">
        {/* 홈 버튼 */}
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="flex flex-col items-center justify-center gap-1"
        >
          {pathname === '/' ? <HomePillIcon /> : <HomeStrokeIcon />}
          <span className="text-sm font-medium leading-[16.4px] text-black">홈</span>
        </button>

        {/* 게시글 작성 버튼 */}
        <button
          type="button"
          onClick={() => handleNavClick('/create')}
          className="flex flex-col items-center justify-center gap-1"
        >
          <PencilPlusIcon />
          <span className="text-sm font-medium leading-[16.4px] text-black">봉사요청</span>
        </button>

        {/* 게시글 리스트 버튼 */}
        <button
          type="button"
          onClick={() => handleNavClick('/list')}
          className="flex flex-col items-center justify-center gap-1"
        >
          {pathname === '/list' ? <NotePillIcon /> : <NoteStrokeIcon />}
          <span className="text-sm font-medium leading-[16.4px] text-black">봉사찾기</span>
        </button>

        {/* 채팅 모달 열기 버튼 */}
        <button type="button" onClick={toggleModal} className="flex flex-col items-center justify-center gap-1">
          {getChatIcon()}
          <span className="text-sm font-medium leading-[16.4px] text-black">Chat</span>
        </button>
      </nav>

      {/* 채팅 모달 */}
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </>
  );
};

export default BottomNav;
