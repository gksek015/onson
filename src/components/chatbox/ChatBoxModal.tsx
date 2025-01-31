'use client';

import { getMarkMessageAsRead } from '@/lib/chats/getMarkMessageAsRead';
import useChatbotStore from '@/utils/store/useChatBotStore';
import { useGNBStore } from '@/utils/store/useGNBStore';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CloseIcon } from '../icons/Icons';
import AIChatroom from './ai/AIChatroom';
import ChatInBox from './ChatInbox';
import ChatHeader from './chatUI/ChatHeader';
import ModalHeader from './chatUI/ModalHeader';

interface ChatBoxModalProps {
  onClose: () => void;
  initialChatId?: string | null;
}

const ChatBoxModal = ({ onClose, initialChatId }: ChatBoxModalProps) => {
  const [activeTab, setActiveTab] = useState('온손 AI');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(initialChatId || null);

  const { user } = useUserStore();
  const { setActiveTab: setGNBActiveTab, setIsGNBVisible } = useGNBStore();
  const { isChatbotVisible, showChatbot, setIsChatbotVisible, setShowChatbot } = useChatbotStore();

  const router = useRouter();

  useEffect(() => {
    if (initialChatId) {
      setSelectedChatId(initialChatId);
    }
  }, [initialChatId]);

  const handleEnterChatRoom = async (chatId: string) => {
    setSelectedChatId(chatId);
    await getMarkMessageAsRead(chatId, user?.id || '');
  };

  const handleClose = async () => {
    if (selectedChatId && user?.id) {
      await getMarkMessageAsRead(selectedChatId, user.id);
    }
    setIsChatbotVisible(false);
    setShowChatbot(false);
    setGNBActiveTab('home');
    onClose();
  };

  const handleBackToList = () => {
    if (showChatbot) {
      setShowChatbot(false);
    } else if (isChatbotVisible) {
      setIsChatbotVisible(false);
    } else if (selectedChatId) {
      setSelectedChatId(null);
      setActiveTab('실시간 채팅');
      setIsGNBVisible(true);
    }
  };

  const handleChatbotToggle = (isVisible: boolean) => {
    setShowChatbot(isVisible);
    setIsChatbotVisible(true);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-white ${!selectedChatId && !showChatbot ? 'mb-[81.41px]' : ''} md:absolute md:bottom-[80px] md:left-auto md:right-[80px] md:top-auto md:mb-0 md:h-[650px] md:w-[396px] md:rounded-[20px] md:border md:shadow-lg`}
    >
      {/* 닫기 버튼 (모바일과 데스크탑 모두에서 보이도록 조정) */}
      {!selectedChatId && (!isChatbotVisible || !showChatbot) && (
        <div className="hidden items-center justify-end border-b p-2 md:flex">
          <button onClick={handleClose} className="hidden items-center justify-center p-2 md:flex">
            <CloseIcon />
          </button>
        </div>
      )}

      {/* 상단 탭바 (모바일은 상단, 데스크탑은 하단) */}
      {!selectedChatId && (!isChatbotVisible || !showChatbot) && (
        <div className="flex items-center justify-between border-b md:absolute md:bottom-0 md:left-0 md:w-full md:border-t">
          <div className="flex flex-1 justify-center gap-12">
            <button
              onClick={() => setActiveTab('온손 AI')}
              className={`inline-block py-[15px] text-center ${
                activeTab === '온손 AI' ? 'border-b-2 border-black font-bold text-black' : 'text-gray-500'
              }`}
            >
              온손 AI
            </button>
            <button
              onClick={() => setActiveTab('실시간 채팅')}
              className={`inline-block py-[15px] text-center ${
                activeTab === '실시간 채팅' ? 'border-b-2 border-black font-bold text-[#595959]' : 'text-gray-500'
              }`}
            >
              실시간 채팅
            </button>
          </div>
        </div>
      )}

      {/* 모달쪽 헤더 */}
      {isChatbotVisible && showChatbot && (
        <ModalHeader title="AI Chat" onClose={handleClose} onBack={handleBackToList} />
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
      <div className={`flex-1 overflow-y-auto ${selectedChatId || showChatbot ? '' : 'md:mb-[60px]'}`}>
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
              selectedChatId={null}
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
                  className="mx-auto mb-20 w-full max-w-xs rounded bg-[#fb657e] py-3 text-center text-white"
                  onClick={() => {
                    router.push('/login');
                    onClose();
                  }}
                >
                  로그인
                </button>
              </div>
            </div>
          )
        ) : (
          <AIChatroom onChatbotToggle={handleChatbotToggle} />
        )}
      </div>
    </div>
  );
};

export default ChatBoxModal;
