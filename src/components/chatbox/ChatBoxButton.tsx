'use client';

import onson from '@/assets/onson.png';
import { useGNBStore } from '@/utils/store/useGNBStore';
import { useModalStore } from '@/utils/store/useModalStore';
import Image from 'next/image';

// 실시간 채팅, ai chat봇을 위한 플로팅 버튼

const ChatBoxButton = () => {
  const { openModal } = useModalStore();
  const { setActiveTab } = useGNBStore();

  const handleChatOpen = () => {
    setActiveTab('chat');
    openModal();
  };

  return (
    <>
      <button
        onClick={handleChatOpen}
        className="z-100 fixed bottom-24 right-5 flex items-center justify-center rounded-full shadow-lg desktop:bottom-[80px] desktop:right-[80px]"
      >
        <Image src={onson} alt="onson icon" width={80} height={80} priority />
      </button>
    </>
  );
};

export default ChatBoxButton;
