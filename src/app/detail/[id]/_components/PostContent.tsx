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
    <div className="my-7 flex flex-col justify-center gap-4 pb-20">
      <div className="mx-4 flex flex-col justify-center gap-2 desktop:mx-0">
        {/* 태그 */}
        <PostTags category={category} startDate={startDate} endDate={endDate} isPostClosed={isPostClosed} />
        <div className="flex flex-col desktop:gap-5">
          <div className="mt-1 text-lg font-semibold tracking-[-0.5px] desktop:text-3xl">{title}</div>

          {/* 주소 */}
          <div className="my-2 flex items-center">
            <MapPinIcon />
            <span className="ml-1 font-semibold text-[#666]">{`${address.si} ${address.gu} ${address.dong}`}</span>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
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
              <div className="font-medium text-[#6D7379]">{nickname}</div>
            </div>
            <BookmarkButton postId={postId} />
          </div>

          {/* 버튼 */}
          <PostActionButtons title={title} nickname={nickname} postOwnerId={postOwnerId} isPostClosed={isPostClosed} postId={postId} />
        </div>

        {/* 가로선 */}
        <hr className="mt-4 border-gray-300" />
        <div className="mx-5 mt-5 whitespace-pre-line leading-6 desktop:mx-0">{content}</div>
      </div>
    </div>
  );
};

export default PostContent;
