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
  const [activeTab, setActiveTab] = useState('온손 AI'); //'실시간채팅'과  '온손 AI' 두개의 탭 상태 관리
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

  // 메세지를 읽음에 따라 채팅방 입장 처리하는 함수
  const handleEnterChatRoom = async (chatId: string) => {
    setSelectedChatId(chatId);
    await getMarkMessageAsRead(chatId, user?.id || '');
  };

  // 모달을 닫기위해 사용한 함수
  const handleClose = async () => {
    if (selectedChatId && user?.id) {
      await getMarkMessageAsRead(selectedChatId, user.id); // 모달 닫힐 때 읽음 처리
    }
    setIsChatbotVisible(false);
    setShowChatbot(false);
    setGNBActiveTab('home');
    onClose();
  };

  // 뒤로가기
  const handleBackToList = () => {
    if (showChatbot) {
      // AI 대화 화면 -> AI 초기 화면으로 복귀
      setShowChatbot(false);
    } else if (isChatbotVisible) {
      // AI 초기 화면 -> 탭바로 복귀
      setIsChatbotVisible(false);
    } else if (selectedChatId) {
      // 채팅방 -> 채팅 리스트로 복귀
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
      className={`fixed inset-0 z-50 flex flex-col bg-white ${!selectedChatId && !showChatbot ? 'mb-[81.41px]' : ''} desktop:bottom-5 desktop:right-5 desktop:h-[650px] desktop:w-[396px] desktop:rounded-[20px] desktop:border desktop:border-gray-200 desktop:shadow-lg`}
    >
      <button onClick={handleClose} className="absolute right-4 top-4 hidden p-2 transition desktop:block">
        <CloseIcon />
      </button>

      {/* 상단 탭바 */}
      {!selectedChatId && (!isChatbotVisible || !showChatbot) && (
        <div className="flex items-center justify-between border-b">
          {/* 탭바 */}
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
      <div className="flex-1 overflow-y-auto">
        {selectedChatId ? ( // selectedChatId가 있으면 메시지 화면 렌더링
          <ChatInBox
            selectedChatId={selectedChatId}
            userId={user?.id || ''}
            onEnterChatRoom={handleEnterChatRoom}
            onBackToList={handleBackToList}
          />
        ) : activeTab === '실시간 채팅' ? ( // '실시간 채팅' 탭 활성화 시 채팅 리스트 렌더링
          user ? (
            <ChatInBox
              selectedChatId={null}
              userId={user?.id || ''}
              onEnterChatRoom={handleEnterChatRoom}
              onBackToList={handleBackToList}
            />
          ) : (
            // 사용자 로그아웃 상태
            <div className="flex h-full flex-col justify-between text-center">
              {/* 설명 텍스트 */}
              <div className="flex flex-1 items-center justify-center">
                <p className="mb-4 text-gray-500">실시간 채팅 이용시 로그인 필요합니다.</p>
              </div>

              {/* 하단 버튼 */}
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
          // '온손 AI' 탭 활성화 시 AI 대화 화면 렌더링
          <AIChatroom onChatbotToggle={handleChatbotToggle} />
        )}
      </div>
    </div>
  );
};

export default ChatBoxModal;
