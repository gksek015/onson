'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import { RightArrowForChatIcon } from '@/components/icons/Icons';

import { newChatApi } from '@/lib/chats/newChatRoom';
import { sendMessage } from '@/lib/chats/newMessage';
import { insertParticipant } from '@/lib/detail/participants';
import { useGNBStore } from '@/utils/store/useGNBStore';
import { useModalStore } from '@/utils/store/useModalStore';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface PostActionButtonsProps {
  postOwnerId: string;
  title: string;
  isPostClosed: boolean;
  postId: string;
}

const PostActionButtons = ({ title, postOwnerId, isPostClosed, postId }: PostActionButtonsProps) => {
  const { isOpen, toggleModal, setSelectedChatId } = useModalStore();
  const { user } = useUserStore();
  const router = useRouter();
  const { setActiveTab } = useGNBStore();

  const handleChatClick = async () => {
    if (isPostClosed) {
      Swal.fire({
        title: '모집 마감',
        text: '해당 게시글의 모집이 마감되었습니다.',
        icon: 'info',
        confirmButtonText: '확인'
      }).then(() => {
        // 다시 해당 게시글 페이지로 리다이렉트
        router.push(`/detail/${postId}`);
      });
      return; // 종료
    }

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

    // 참여자 목록에 자동 추가
    await insertParticipant(postId, user.id);

    // 채팅 모달 열기
    setActiveTab('chat');
    setSelectedChatId(chatRoom.id);
    toggleModal();
  };

  return (
    <>
      {user?.id !== postOwnerId && (
        <button
          onClick={handleChatClick}
          className={`flex w-full items-center justify-between rounded-lg ${
            isPostClosed
              ? 'cursor-not-allowed border-2 border-[#A6A6A6] font-semibold text-[#A6A6A6]' // 모집 마감 스타일
              : 'cursor-pointer border-2 border-[#FA5571] font-semibold text-[#FA5571]' // 모집 진행 중 스타일
          } mb-2 p-2.5 focus:outline-none desktop:px-4 desktop:py-3`}
        >
          <span>채팅으로 봉사 신청하기</span>
          <RightArrowForChatIcon color={isPostClosed ? '#A6A6A6' : '#FA5571'} />
        </button>
      )}
      {isOpen && <ChatBoxModal onClose={toggleModal} />}
    </>
  );
};

export default PostActionButtons;
