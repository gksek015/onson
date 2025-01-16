'use client';

import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AIChatroom from './ai/AIChatroom';
import ChatInBox from './ChatInbox';
import ChatHeader from './chatUI/ChatHeader';
import ModalHeader from './chatUI/ModalHeader';

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
      {selectedChatId ? (
        // 채팅방 헤더 부분
        <ChatHeader
          chatId={selectedChatId}
          currentUserId={user?.id || ''}
          onBack={handleBackToList}
          onClose={onClose}
        />
      ) : (
        <ModalHeader title={activeTab} onClose={onClose} /> //모달 헤더 부분분
      )}

      {/* 채팅창 부분 + 바텀 탭바*/}
      <div className="flex-1">
        <div className="flex h-full flex-col">
          {/* 컨텐츠 */}
          <div className="flex-1 p-4">
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
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="mb-4 text-gray-500">실시간 채팅을 이용하려면 로그인이 필요합니다.</p>
                <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => router.push('/login')}>
                  로그인으로 이동
                </button>
              </div>
            )}
          </div>
          {/* 탭바 */}
          <div className="flex border-t">
            <button
              onClick={() => setActiveTab('온손이 AI')}
              className={`flex-1 p-4 text-center ${
                activeTab === '온손이 AI' ? 'border-t-2 border-blue-500 font-bold text-blue-500' : 'text-gray-500'
              }`}
            >
              👁️‍🗨️ 온손이 AI
            </button>
            <button
              onClick={() => setActiveTab('실시간 채팅')}
              className={`flex-1 p-4 text-center ${
                activeTab === '실시간 채팅' ? 'border-t-2 border-blue-500 font-bold text-blue-500' : 'text-gray-500'
              }`}
            >
              🗨️ 실시간 채팅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxModal;
