'use client';

import { useState } from 'react';
// import Chatroom from './chatUI/Chatroom';
import AIChatroom from './ai/AIChatroom';
import ChatInbox from './ChatInbox';

interface ChatBoxModalProps {
  onClose: () => void;
}

const ChatBoxModal = ({ onClose }: ChatBoxModalProps) => {
  const [activeTab, setActiveTab] = useState('온손이 AI'); //'실시간채팅'과  '온손이 AI' 두개의 탭 상태 관리

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* 모달 헤더 */}
      <div className="p-8 border-b relative flex items-center justify-center">
        {/* 이전 버튼: 실시간 채팅 목록 안에 채팅방인 경우에만 생김 ==>
        실시간 채팅방 에서 실시간 채팅방 목록으로 이동하는 버튼
        
        TODO: 여기 디자이너님과 상의 후 버튼 추가되는 것으로 결정나면 컨텐츠 컴포넌트가 ChatInbox 안에서 클릭된 chatroom인지를 파악하시고 onclick 시 이동 로직 추가하셔야할 것 같네요...
        <button onClick={} className="absolute left-4 text-purple-600">
          🡸
        </button> */}
        <div className="absolute left-0 right-0 text-center text-lg font-bold">{activeTab}</div>
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute right-4">
          ✖️
        </button>
      </div>

      {/* 채팅창 부분 + 바텀 탭바*/}
      <div className="flex-1">
        <div className="h-full flex flex-col">
          {/* 컨텐츠 */}
          <div className="flex-1 p-4">
            {activeTab === '온손이 AI' ? <AIChatroom></AIChatroom> : <ChatInbox></ChatInbox>}
          </div>
          {/* 탭바 */}
          <div className="flex border-t">
            <button
              onClick={() => setActiveTab('온손이 AI')}
              className={`flex-1 p-4 text-center ${
                activeTab === '온손이 AI' ? 'border-t-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'
              }`}
            >
              👁️‍🗨️ 온손이 AI
            </button>
            <button
              onClick={() => setActiveTab('실시간 채팅')}
              className={`flex-1 p-4 text-center ${
                activeTab === '실시간 채팅' ? 'border-t-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'
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
