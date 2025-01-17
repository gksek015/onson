'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import { RightArrowForChatIcon } from '@/components/icons/Icons';
import useModal from '@/hooks/ui/useModal';
import { newChatApi } from '@/lib/chats/newChatRoom';
import { sendMessage } from '@/lib/chats/newMessage';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface PostActionButtonsProps {
  nickname: string;
  postOwnerId: string;
}

const PostActionButtons = ({ nickname, postOwnerId }: PostActionButtonsProps) => {
  const { isOpen, toggleModal } = useModal();
  const { user } = useUserStore();
  const router = useRouter();

  const handleChatClick = async () => {
    if (!user) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후 채팅 기능을 사용할 수 있습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하기',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return;
    }

    const { data: chatRoom, error: chatRoomError } = await newChatApi(user.id, postOwnerId);

    if (chatRoomError || !chatRoom) {
      Swal.fire({
        title: '오류 발생',
        text: '채팅방을 생성할 수 없습니다. 잠시 후 다시 시도해주세요.',
        icon: 'error'
      });
      return;
    }

    if (chatRoom.is_new) {
      const firstMessage = `${title} 관련하여 대화를 시작합니다.`;
      const { error } = await sendMessage(chatRoom.id, user.id, firstMessage);

      if (error) {
        Swal.fire({
          title: '오류 발생',
          text: '메시지를 전송할 수 없습니다. 잠시 후 다시 시도해주세요.',
          icon: 'error'
        });
        return;
      }
    }

    // 채팅 모달 열기
    toggleModal();
  };

  return (
    <>
      {user?.id !== postOwnerId && (
        <button
          onClick={handleChatClick}
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
