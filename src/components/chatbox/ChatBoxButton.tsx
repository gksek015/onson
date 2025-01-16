'use client';

import useModal from '@/hooks/ui/useModal';
import { FlutingButton } from '../icons/Icons';
import ChatBoxModal from './ChatBoxModal';

// 실시간 채팅, ai chat봇을 위한 플로팅 버튼

const ChatBoxButton = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      <button
        onClick={toggleModal}
        className="z-100 fixed bottom-24 right-5 flex h-12 w-12 items-center justify-center"
      >
        <FlutingButton />
      </button>
      {isOpen && <ChatBoxModal onClose={toggleModal}></ChatBoxModal>}
    </>
  );
};

export default ChatBoxButton;
