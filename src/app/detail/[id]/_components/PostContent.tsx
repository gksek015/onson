'use client';

import { MapPinIcon, MyProfileIcon } from '@/components/icons/Icons';
import Image from 'next/image';
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
  profileImgUrl: string | null;
}

const PostContent = ({
  title,
  nickname,
  content,
  postId,
  postOwnerId,
  category,
  startDate,
  endDate,
  address,
  isPostClosed,
  profileImgUrl
}: PostContentProps) => {
  return (
    <div className="my-6 flex flex-col justify-center gap-4 pb-20">
      <div className="mx-4 flex flex-col justify-center gap-2">
        {/* 태그 */}
        <PostTags category={category} startDate={startDate} endDate={endDate} isPostClosed={isPostClosed} />
        <div className="mt-1 text-lg font-semibold tracking-[-0.5px]">{title}</div>

        {/* 주소 */}
        <div className="my-2 flex items-center">
          <MapPinIcon />
          <span className="ml-1">{`${address.si} ${address.gu} ${address.dong}`}</span>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div className='flex items-center gap-2'>
            {profileImgUrl ? (
              <div className="relative h-7 w-7 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={profileImgUrl}
                  alt={`${nickname}의 프로필 이미지`}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <MyProfileIcon width="28" height="28" />
            )}
            <div className="text-gray-500">{nickname}</div>
          </div>
          <BookmarkButton postId={postId} />
        </div>

        {/* 버튼 */}
        <PostActionButtons title={title} nickname={nickname} postOwnerId={postOwnerId} />
      </div>

      {/* 가로선 */}
      <hr className="mt-4 border-gray-300" />
      <div className="mx-5 mt-5 leading-6">{content}</div>
    </div>
  );
};

export default PostContent;
