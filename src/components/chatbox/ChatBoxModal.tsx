'use client';

import { useState } from 'react';
// import Chatroom from './chatUI/Chatroom';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import AIChatroom from './ai/AIChatroom';
import ChatInBox from './ChatInBox';

interface ChatBoxModalProps {
  onClose: () => void;
}

const ChatBoxModal = ({ onClose }: ChatBoxModalProps) => {
  const [activeTab, setActiveTab] = useState('온손이 AI'); //'실시간채팅'과  '온손이 AI' 두개의 탭 상태 관리
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* 모달 헤더 */}
      <div className="relative flex items-center justify-center border-b p-8 text-black">
        {/* 이전 버튼: 실시간 채팅 목록 안에 채팅방인 경우에만 생김 ==>

        <div className="absolute left-0 right-0 text-center text-lg font-bold">{activeTab}</div>
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute right-4">
          ✖️
        </button>
      </div>

      {/* 채팅창 부분 + 바텀 탭바*/}
      <div className="flex-1">
        <div className="flex h-full flex-col">
          {/* 컨텐츠 */}
          <div className="flex-1 p-4">
            {activeTab === '온손이 AI' ? (
              <AIChatroom></AIChatroom>
            ) : user ? (
              <ChatInBox userId={user.id} />
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
