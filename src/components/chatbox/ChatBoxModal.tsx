'use client';

import { getMarkMessageAsRead } from '@/lib/chats/getMarkMessageAsRead';
import useChatbotStore from '@/utils/store/useChatBotStore';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { useGNBStore } from '@/utils/store/useGNBStore';
import { useModalStore } from '@/utils/store/useModalStore';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CloseIcon } from '../icons/Icons';
import BottomNav from '../layout/BottomNav';
import AIChatroom from './ai/AIChatroom';
import ChatInBox from './ChatInbox';
import ChatHeader from './chatUI/ChatHeader';
import ModalHeader from './chatUI/ModalHeader';

interface ChatBoxModalProps {
  onClose: () => void;
  currentChatId?: string | null;
}

const ChatBoxModal = ({ onClose, currentChatId }: ChatBoxModalProps) => {
  const { open } = useDialogStore();
  const { selectedChatId, setSelectedChatId, activeTab, setActiveTab, showGNB, setShowGNB } = useModalStore();
  const { user } = useUserStore();
  const { prevActiveTab, setActiveTab: setCurrentGNBActiveTab } = useGNBStore();
  const { isChatbotVisible, showChatbot, setIsChatbotVisible, setShowChatbot } = useChatbotStore();
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (currentChatId) {
      setSelectedChatId(currentChatId);
    }
  }, [currentChatId, setSelectedChatId]);

  const handleEnterChatRoom = async (chatId: string) => {
    setSelectedChatId(chatId);
    await getMarkMessageAsRead(chatId, user?.id || '');
  };

  const handleClose = async () => {
    if (selectedChatId && user?.id) {
      await getMarkMessageAsRead(selectedChatId, user.id);
    }
    setIsChatbotVisible(true);
    setShowChatbot(false);
    setShowGNB(false);
    if (prevActiveTab && ['home', 'create', 'list', 'chat'].includes(prevActiveTab)) {
      setCurrentGNBActiveTab(prevActiveTab as 'home' | 'create' | 'list' | 'chat');
    }
    onClose();
  };

  const handleBackToList = () => {
    if (showChatbot) {
      setShowChatbot(false);
    } else if (selectedChatId) {
      setSelectedChatId(null);
      setActiveTab('실시간 채팅');
      setShowGNB(true);
      setTimeout(() => {
        setCurrentGNBActiveTab('chat');
      }, 0);
    }
  };

  const handleLoginClick = () => {
    if (window.innerWidth < 768) {
      // 모바일에서는 로그인 페이지로 이동
      router.push('/login');
      onClose();
    } else {
      // 데스크탑에서는 채팅 모달 닫고 로그인 모달 열기
      onClose();
      open('loginModal');
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white ${
          !selectedChatId && !showChatbot ? 'mb-[81.41px]' : ''
        } desktop:absolute desktop:bottom-[80px] desktop:left-auto desktop:right-[80px] desktop:top-auto desktop:mb-0 desktop:h-[650px] desktop:w-[396px] desktop:rounded-[20px] desktop:border desktop:shadow-lg`}
      >
        {/* 닫기 버튼 (모바일 & 데스크탑) */}
        {!selectedChatId && !showChatbot && (
          <div className="hidden items-center justify-end border-b p-2 desktop:flex">
            <button onClick={handleClose} className="hidden items-center justify-center p-2 desktop:flex">
              <CloseIcon />
            </button>
          </div>
        )}

        {/* 상단 탭바 (모바일: 상단, 데스크탑: 하단) */}
        {!selectedChatId && !showChatbot && (
          <div className="flex items-center justify-between border-b desktop:absolute desktop:bottom-0 desktop:left-0 desktop:w-full desktop:border-t">
            <div className="flex flex-1 justify-center gap-12">
              <button
                onClick={() => setActiveTab('온손 AI')}
                className={`inline-block py-[15px] text-center ${
                  activeTab === '온손 AI'
                    ? 'border-b-2 border-[#FB657E] font-bold text-[#FB657E] desktop:border-hidden'
                    : 'text-gray-500'
                }`}
              >
                온손 AI
              </button>

              <button
                onClick={() => setActiveTab('실시간 채팅')}
                className={`inline-block py-[15px] text-center ${
                  activeTab === '실시간 채팅'
                    ? 'border-b-2 border-[#FB657E] font-bold text-[#FB657E] desktop:border-hidden'
                    : 'text-gray-500'
                }`}
              >
                실시간 채팅
              </button>
            </div>
          </div>
        )}

        {/* AI쪽 헤더 */}
        {isChatbotVisible && showChatbot && (
          <ModalHeader title="온손 AI" onClose={handleClose} onBack={handleBackToList} />
        )}

        {/* 채팅방 헤더 */}
        {selectedChatId && (
          <ChatHeader
            chatId={selectedChatId}
            currentUserId={user?.id || ''}
            onBack={handleBackToList}
            onClose={handleClose}
          />
        )}

        {/* 컨텐츠 영역 */}
        <div className={`flex-1 overflow-y-auto ${selectedChatId || showChatbot ? '' : 'desktop:mb-[60px]'}`}>
          {selectedChatId ? (
            <ChatInBox
              selectedChatId={selectedChatId}
              userId={user?.id || ''}
              onEnterChatRoom={handleEnterChatRoom}
              onBackToList={handleBackToList}
            />
          ) : activeTab === '실시간 채팅' ? (
            user ? (
              <ChatInBox
                selectedChatId={selectedChatId}
                userId={user?.id || ''}
                onEnterChatRoom={handleEnterChatRoom}
                onBackToList={handleBackToList}
              />
            ) : (
              <div className="flex h-full flex-col justify-between text-center">
                <div className="flex flex-1 items-center justify-center">
                  <p className="mb-4 text-gray-500">실시간 채팅 이용시 로그인 필요합니다.</p>
                </div>
                <div className="p-4">
                  <button
                    className="mx-auto w-full max-w-xs rounded bg-[#fb657e] py-3 text-center text-white"
                    onClick={handleLoginClick}
                  >
                    로그인
                  </button>
                </div>
              </div>
            )
          ) : (
            <AIChatroom onChatbotToggle={setShowChatbot} />
          )}
        </div>
      </div>

      {/* GNB 추가 & 'chat' 유지*/}
      <div className="flex justify-center desktop:hidden">{showGNB && <BottomNav />}</div>
    </div>
  );
};

export default ChatBoxModal;
