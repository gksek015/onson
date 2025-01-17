'use client';

import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CloseIcon} from '../icons/Icons';
import AIChatroom from './ai/AIChatroom';
import ChatInBox from './ChatInbox';
import ChatHeader from './chatUI/ChatHeader';

interface ChatBoxModalProps {
  onClose: () => void;
}

const ChatBoxModal = ({ onClose }: ChatBoxModalProps) => {
  const [activeTab, setActiveTab] = useState('온손이 AI'); //'실시간채팅'과  '온손이 AI' 두개의 탭 상태 관리
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { user } = useUserStore();
  const router = useRouter();

  // 채팅방 입장 처리하는 함수
  const handleEnterChatRoom = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  // 뒤로가기
  const handleBackToList = () => {
    setSelectedChatId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* 상단 탭바와 닫기 버튼 */}
      {!selectedChatId && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          {/* 탭바 */}
          <div className="flex flex-1">
            <button
              onClick={() => setActiveTab('온손이 AI')}
              className={`flex-1 p-2 text-center ${
                activeTab === '온손이 AI' ? 'border-b-2 border-black font-bold text-black' : 'text-gray-500'
              }`}
            >
              온손이 AI
            </button>
            <button
              onClick={() => setActiveTab('실시간 채팅')}
              className={`flex-1 p-2 text-center ${
                activeTab === '실시간 채팅' ? 'border-b-2 border-black font-bold text-black' : 'text-gray-500'
              }`}
            >
              실시간 채팅
            </button>
          </div>
          {/* 닫기 버튼 */}
          <button onClick={onClose} className="right-4 text-xl">
            <CloseIcon />
          </button>
        </div>
      )}

      {/* 채팅방 헤더 */}
      {selectedChatId && (
        <ChatHeader
          chatId={selectedChatId}
          currentUserId={user?.id || ''}
          onBack={handleBackToList}
          onClose={onClose}
        />
      )}

      {/* 컨텐츠 영역 */}
      <div className="flex-1 overflow-auto">
        {activeTab === '온손이 AI' ? (
          <AIChatroom />
        ) : user ? (
          <ChatInBox
            selectedChatId={selectedChatId}
            userId={user.id}
            onEnterChatRoom={handleEnterChatRoom}
            onBackToList={handleBackToList}
          />
        ) : (
          <div className="flex h-full flex-col justify-between text-center">
            {/* 설명 텍스트 */}
            <div className="flex flex-1 items-center justify-center">
              <p className="mb-4 text-gray-500">실시간 채팅 이용시 로그인이 필요합니다.</p>
            </div>

            {/* 하단 버튼 */}
            <div className="p-4">
              <button
                className="mx-auto w-full max-w-xs rounded bg-[#4B4B4B] py-3 text-center text-white"
                onClick={() => {
                  router.push('/login');
                  onClose();
                }}
              >
                로그인으로 이동
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBoxModal;
