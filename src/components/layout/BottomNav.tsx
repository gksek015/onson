'use client';

import { useGNBStore, useSyncGNBStore } from '@/utils/store/useGNBStore';
import { useModalStore } from '@/utils/store/useModalStore';
import { useUserStore } from '@/utils/store/userStore';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
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
  const { isOpen, openModal, closeModal } = useModalStore();
  const { user } = useUserStore();
  const { unreadMessages, subscribeToRealtimeMessages, refetch } = useUnreadMessageStore();
  const { activeTab, setActiveTab } = useGNBStore();

  const isInitialized = useSyncGNBStore();

  // GNB 상태를 URL과 동기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/list')) setActiveTab('list');
      else if (path.includes('/create')) setActiveTab('create');
      else setActiveTab('home');
    }
  }, []);

  // 실시간 메시지 구독
  useEffect(() => {
    if (user?.id) {
      refetch(user.id); // 초기 데이터 로드
      subscribeToRealtimeMessages(user.id); // 실시간 동기화
    }
  }, [user?.id]);

  const hasUnreadMessages = Object.values(unreadMessages).some((val) => val);

  // 채팅 아이콘 메모이제이션
  const getChatIcon = () =>
    activeTab === 'chat' ? (
      hasUnreadMessages ? (
        <MessageCircleIcon />
      ) : (
        <MessagePillIcon />
      )
    ) : hasUnreadMessages ? (
      <MessageCircleIcon />
    ) : (
      <MessageStrokeIcon />
    );

  const handleNavClick = (tab: 'home' | 'create' | 'list', path: string) => {
    setActiveTab(tab); // GNB 상태 변경
    closeModal();
    // 모달 닫기
    window.location.href = path; // 새로고침 없이 페이지 이동
  };

  return (
    <>
      {isInitialized && (
        <nav className="z-70 fixed bottom-0 flex w-full justify-around border-t bg-white p-4">
          {/* 홈 버튼 */}
          <button
            type="button"
            onClick={() => handleNavClick('home', '/')}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === 'home' ? <HomePillIcon /> : <HomeStrokeIcon />}
            <span className="text-sm font-medium leading-[16.4px] text-black">홈</span>
          </button>

          {/* 게시글 작성 버튼 */}
          <button
            type="button"
            onClick={() => handleNavClick('create', '/create')}
            className="flex flex-col items-center justify-center gap-1"
          >
            <PencilPlusIcon />
            <span className="text-sm font-medium leading-[16.4px] text-black">봉사요청</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('list', '/list')}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === 'list' ? <NotePillIcon /> : <NoteStrokeIcon />}
            <span className="text-sm font-medium leading-[16.4px] text-black">봉사게시판</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('chat');
              openModal();
            }}
            className="flex flex-col items-center justify-center gap-1"
          >
            {getChatIcon()}
            <span className="text-sm font-medium leading-[16.4px] text-black">Chat</span>
          </button>
        </nav>
      )}

      {/* 채팅 모달 */}
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </>
  );
};

export default BottomNav;
