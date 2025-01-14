'use client';
import { IoBookmarkOutline } from 'react-icons/io5';
// import { IoBookmark } from 'react-icons/io5';
import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import useModal from '@/hooks/ui/useModal';
import { GrFormNext } from 'react-icons/gr';

// TODO: 북마크 기능 추가 필요(컴포넌트로)
// TODO: 포스트 쓴 유저가 로그인한 유저이면 채팅하기 대신에 수정 삭제 버튼 들어감

interface PostContentProps {
  title: string;
  nickname: string;
  date: string;
  // isBookmarked: boolean;
  // isUser: boolean;
  content: string;
}

const PostContent = ({ title, nickname, date, content }: PostContentProps) => {
  const { isOpen, toggleModal } = useModal();
  console.log("날짜:", date)

  return (
    <div className="my-6 flex flex-col justify-center gap-4 pb-20">
      {/* 포스트 내용부분들 */}
      <div className="mx-4 flex flex-col justify-center gap-2 font-semibold">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-gray-500">{nickname}</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-600">{date}</div>
          <div className="flex items-center rounded-lg bg-slate-100 px-3 py-2 text-gray-600">
            <IoBookmarkOutline size={18} className="mr-1" />
            <span className="text-sm">저장</span>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={toggleModal}
            className="flex w-full items-center justify-between rounded-lg border-2 border-gray-500 px-4 py-3 text-gray-600 focus:outline-none"
          >
            <span>{nickname}님과 채팅하기</span>
            <GrFormNext size={24} />
          </button>
        </div>
      </div>

      {/* 가로 선 */}
      <hr className="mt-4 border-gray-300" />
      <div className="mx-4">{content}</div>

      {/* TODO: 여기서 모달로 이동할 때에는 온손이가 아니라 바로 채팅하기로 이동하는 것 고려 */}
      {/* ChatBoxModal 모달 */}
      {isOpen && <ChatBoxModal onClose={toggleModal} />}
    </div>
  );
};

export default PostContent;
