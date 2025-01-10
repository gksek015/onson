'use client';

import { useState } from 'react';
import ChatBoxModal from './ChatBoxModal';

// 실시간 채팅, ai chat봇을 위한 플로팅 버튼

const ChatBoxButton = () => {
  const [isOpen, setIsOpen] = useState(false); // 모달 열기 닫기 상태
  const toggleChatBox = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleChatBox}
        className="fixed bottom-24 right-5 bg-blue-500 text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center z-100"
      >
        🗨️
      </button>
      {isOpen && <ChatBoxModal onClose={toggleChatBox}></ChatBoxModal>}
    </>
  );
};

export default ChatBoxButton;
