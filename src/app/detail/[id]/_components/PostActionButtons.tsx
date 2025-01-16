'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import useModal from '@/hooks/ui/useModal';
import { RightArrowForChatIcon } from '@/components/icons/Icons';

interface PostActionButtonsProps {
  isUserPost: boolean;
  nickname: string;
}

const PostActionButtons = ({ isUserPost, nickname }: PostActionButtonsProps) => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      {isUserPost ? (
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600">수정</button>
          <button className="flex-1 rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600">삭제</button>
        </div>
      ) : (
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
