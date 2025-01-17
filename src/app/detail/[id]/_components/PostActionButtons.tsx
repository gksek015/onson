'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import { RightArrowForChatIcon } from '@/components/icons/Icons';
import useModal from '@/hooks/ui/useModal';
import { useUserStore } from '@/utils/store/userStore';

interface PostActionButtonsProps {
  nickname: string;
  postOwnerId: string;
}

const PostActionButtons = ({nickname, postOwnerId }: PostActionButtonsProps) => {
  const { isOpen, toggleModal } = useModal();
  const { user } = useUserStore();
  
  return (
    <>
      {user?.id !== postOwnerId && (
        <button
          onClick={toggleModal}
          className="flex w-full items-center justify-between rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600 focus:outline-none"
        >
          <span>{nickname}님과 채팅하기</span>
          <RightArrowForChatIcon />
        </button>
      )}
      {isOpen && <ChatBoxModal onClose={toggleModal} />}
    </>
  );
};

export default PostActionButtons;
