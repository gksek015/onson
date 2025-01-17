'use client';

import { MapPinIcon } from '@/components/icons/Icons';
import { createdAtDate } from '@/utils/date/createdDate';
import BookmarkButton from './BookmarkButton';
import PostActionButtons from './PostActionButtons';
import PostTags from './PostTags';

interface PostContentProps {
  title: string;
  nickname: string;
  created_at: string;
  content: string;
  postId: string;
  postOwnerId: string;
  category: string;
  startDate: string;
  endDate: string;
  address: { si: string; gu: string; dong: string };
  isPostClosed: boolean;
}

const PostContent = ({
  title,
  nickname,
  created_at,
  content,
  postId,
  postOwnerId,
  category,
  startDate,
  endDate,
  address,
  isPostClosed
}: PostContentProps) => {
  return (
    <div className="my-6 flex flex-col justify-center gap-4 pb-20">
      <div className="mx-4 flex flex-col justify-center gap-2">
        {/* 태그 */}
        <PostTags category={category} startDate={startDate} endDate={endDate} isPostClosed={isPostClosed} />
        <div className="mt-1 text-xl font-bold">{title}</div>

        {/* 주소 */}
        <div className="my-2 flex items-center">
          <MapPinIcon />
          <span className="ml-1">{`${address.si} ${address.gu} ${address.dong}`}</span>
        </div>

        <div className="text-gray-500">{nickname}</div>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-gray-600">{createdAtDate(created_at)}</div>
          <BookmarkButton postId={postId} />
        </div>

        {/* 버튼 */}
        <PostActionButtons title={title} nickname={nickname} postOwnerId={postOwnerId} />
      </div>

      {/* 가로선 */}
      <hr className="mt-4 border-gray-300" />
      <div className="mx-4">{content}</div>
    </div>
  );
};

export default PostContent;
