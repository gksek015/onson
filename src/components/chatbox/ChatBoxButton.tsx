'use client';

import onson from '@/assets/onson.png';
import useModal from '@/hooks/ui/useModal';
import Image from 'next/image';
import ChatBoxModal from './ChatBoxModal';

// 실시간 채팅, ai chat봇을 위한 플로팅 버튼

const ChatBoxButton = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      <button
        onClick={toggleModal}
        className="z-100 fixed bottom-24 right-5 flex items-center justify-center rounded-full shadow-lg"
      >
        <Image src={onson} alt="onson icon" width={80} height={80} priority />
      </button>
      {isOpen && <ChatBoxModal onClose={toggleModal}></ChatBoxModal>}
    </>
  );
};

export default ChatBoxButton;
