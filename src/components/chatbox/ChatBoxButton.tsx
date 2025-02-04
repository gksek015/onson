'use client';

import onson from '@/assets/onson.png';
import useModal from '@/hooks/ui/useModal';
import { useGNBStore } from '@/utils/store/useGNBStore';
import Image from 'next/image';
import ChatBoxModal from './ChatBoxModal';

// 실시간 채팅, ai chat봇을 위한 플로팅 버튼

const ChatBoxButton = () => {
  const { isOpen, toggleModal, closeModal } = useModal();
  const { setActiveTab } = useGNBStore();

  const handleChatOpen = () => {
    setActiveTab('chat');
    toggleModal();
  };

  return (
    <>
      <button
        onClick={handleChatOpen}
        className="z-100 fixed bottom-24 right-5 flex items-center justify-center rounded-full shadow-lg desktop:bottom-[80px] desktop:right-[80px]"
      >
        <Image src={onson} alt="onson icon" width={80} height={80} priority />
      </button>
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </>
  );
};

export default ChatBoxButton;
