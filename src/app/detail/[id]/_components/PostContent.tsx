'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import useModal from '@/hooks/ui/useModal';
import { useBookmarks } from '@/hooks/useBookmarks';
import { newChatApi } from '@/lib/chats/newChatRoom';
import { sendMessage } from '@/lib/chats/newMessage';
import type { bookmark } from '@/types/BookmarkType';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { GrFormNext } from 'react-icons/gr';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface PostContentProps {
  title: string;
  nickname: string | undefined;
  date: string;
  content: string;
  postId: string;
  postOwnerId: string;
}

const PostContent = ({ title, nickname, date, content, postId, postOwnerId }: PostContentProps) => {
  const { user } = useUserStore();
  const { isOpen, toggleModal } = useModal();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks(user?.id || '');
  const router = useRouter();

  const isBookmarked = bookmarks?.some((bookmark: bookmark) => bookmark.post_id === postId);
  const isUserPost = user?.id === postOwnerId;

  // 로그인 안되어있을 때 알림창
  const handleBookmark = () => {
    if (!user) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '북마크 기능을 사용하려면 로그인이 필요합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하러 가기',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          // 로그인 페이지로 이동
          router.push('/login');
        }
      });
      return;
    }

    if (isBookmarked) {
      removeBookmark({ userId: user.id, postId });
    } else {
      addBookmark({ userId: user.id, postId });
    }
  };

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
    <div className="my-6 flex flex-col justify-center gap-4 pb-20">
      {/* 포스트 정보 */}
      <div className="mx-4 flex flex-col justify-center gap-2 font-semibold">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-gray-500">{nickname}</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-600">{date}</div>
          <div
            className="flex cursor-pointer items-center rounded-lg bg-slate-100 px-3 py-2 text-gray-600"
            onClick={handleBookmark}
          >
            {isBookmarked ? (
              <IoBookmark size={18} className="mr-1" />
            ) : (
              <IoBookmarkOutline size={18} className="mr-1" />
            )}
            <span className="text-sm">{isBookmarked ? '저장됨' : '저장'}</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-4">
          {isUserPost ? (
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600">수정</button>
              <button className="flex-1 rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600">삭제</button>
            </div>
          ) : (
            <button
              onClick={handleChatClick}
              className="flex w-full items-center justify-between rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600 focus:outline-none"
            >
              <span>{nickname}님과 채팅하기</span>
              <GrFormNext size={24} />
            </button>
          )}
        </div>
      </div>

      {/* 가로 선 */}
      <hr className="mt-4 border-gray-300" />
      <div className="mx-4">{content}</div>

      {/* 채팅 모달 */}
      {isOpen && <ChatBoxModal onClose={toggleModal} />}
    </div>
  );
};

export default PostContent;
