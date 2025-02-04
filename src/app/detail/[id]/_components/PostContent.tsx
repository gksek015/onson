'use client';

import { MapPinIcon, MyProfileIcon } from '@/components/icons/Icons';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BookmarkButton from './BookmarkButton';
import ParticipantList from './ParticipantList';
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
  const router = useRouter();
  const { setUser } = useNicknameStore();

  const handleClick = async () => {
    const { data: idData, error: idError } = await supabase.from('users').select().eq('nickname', nickname).single();
    if (idError || !idData) {
      console.error('유저 UUID 조회 오류:', idError);
      throw new Error('Failed to fetch user UUID');
    }
    setUser({
      id: idData.id,
      nickname: nickname,
      profileImage: idData.profile_img_url ?? null // null 허용
    });
    router.push('/user-page');
  };

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
          <div className="flex cursor-pointer items-center gap-2" onClick={handleClick}>
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
        <PostActionButtons title={title} postId={postId} nickname={nickname} postOwnerId={postOwnerId} />
      </div>

      {/* 가로선 */}
      <hr className="mt-4 border-gray-300" />

      {/* 본문 내용 */}
      <div className="mx-5 mt-5 whitespace-pre-line leading-6">{content}</div>

      {/* 봉사 참여자 목록 */}
      <ParticipantList postId={postId} postOwnerId={postOwnerId} />
    </div>
  );
};

export default PostContent;
