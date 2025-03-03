'use client';

import { CloseIcon, MapPinIcon, MeatballMenuIcon, MyProfileIcon } from '@/components/icons/Icons'; // MeatballMenuIcon 추가
import { useGetPostById } from '@/hooks/useGetPostById';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore'; // 유저 정보를 가져오기 위해 추가
import { supabase } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // useState 추가
import Swal from 'sweetalert2';

import BookmarkButton from './BookmarkButton';
import ParticipantList from './ParticipantList';
import PostActionButtons from './PostActionButtons';
import PostTags from './PostTags';

interface PostContentProps {
  title: string;
  nickname: string;
  content: string;
  postId: string;
  postOwnerId: string;
  category: string;
  startDate: string;
  endDate: string;
  address: { si: string; gu: string; dong: string };
  isPostClosed: boolean;
  profileImgUrl: string | null;
  postPageId: string;
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
  profileImgUrl,
  postPageId
}: PostContentProps) => {
  const { data: post, deletePostById, updateCompletedById } = useGetPostById(postPageId);
  const { user } = useUserStore(); // 현재 로그인한 사용자 가져오기
  const queryClient = useQueryClient();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
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

  // 브라우저 크기 변경에 따라 상태 업데이트
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop(); // 초기 화면 크기 확인
    window.addEventListener('resize', checkIsDesktop); // 리사이즈 이벤트 감지

    return () => {
      window.removeEventListener('resize', checkIsDesktop); // 클린업
    };
  }, []);

  const handleMeatballClick = () => {
    setIsDropdownOpen((prevState) => !prevState); // 드롭다운 열림/닫힘 토글
  };

  const handleCloseSheet = () => {
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  // 모집 마감 토글 핸들러
  const handleToggleRecruitment = () => {
    const isPastEndDate = dayjs(post?.end_date).isBefore(dayjs(), 'day'); // 마감 조건 확인

    if (!isPastEndDate) {
      updateCompletedById.mutate(postPageId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      });
    } else {
      Swal.fire({
        title: `모집 마감 불가`,
        text: `기한이 이미 끝난 봉사활동입니다.`,
        icon: 'warning',
        confirmButtonText: '확인'
      });
    }
    handleCloseSheet();
  };

  // 게시글 수정 핸들러
  const handleEdit = () => {
    router.push(`/post-update/${postId}`);
    handleCloseSheet();
  };

  // 게시글 삭제 핸들러
  const handleDelete = () => {
    handleCloseSheet();
    Swal.fire({
      title: `게시물 삭제`,
      text: `정말 삭제하시겠습니까?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostById.mutate(postPageId, {
          onSuccess: () => {
            // 삭제 후 관련 데이터를 무효화
            queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.push('/list');
          },
          onError: (error) => {
            console.log(error);
          }
        });
      }
    });
    return;
  };

  return (
    <div className="my-7 flex flex-col justify-center pb-20">
      <div className="mx-4 flex flex-col justify-center gap-2 desktop:mx-0">
        {/* 태그 */}
        <PostTags category={category} startDate={startDate} endDate={endDate} isPostClosed={isPostClosed} />
        <div className="flex flex-col gap-1 desktop:gap-5">
          <div className="mt-1 text-lg font-semibold tracking-[-0.5px] desktop:text-3xl">{title}</div>

          {/* 주소 */}
          <div className="mb-1 mt-1 flex items-center desktop:mb-0 desktop:mt-0">
            <MapPinIcon />
            <span className="ml-1 font-semibold text-[#666]">{`${address.si} ${address.gu} ${address.dong}`}</span>
          </div>

          <div className="relative mb-3 mt-1 flex items-center justify-between desktop:mt-0">
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
              <div className="font-medium text-[#6D7379]">{nickname}</div>
            </div>
            {/* 게시글 작성자인 경우 MeatballMenuIcon, 아닌 경우 BookmarkButton */}
            {/* 조건부 렌더링 */}
            {user?.id === postOwnerId ? (
              isDesktop ? (
                <button onClick={handleMeatballClick}>
                  <MeatballMenuIcon />
                </button>
              ) : null // 모바일에서는 아무것도 렌더링하지 않음
            ) : (
              <BookmarkButton postId={postId} />
            )}
            {/* 드롭다운 */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-50 rounded-md border border-gray-300 bg-white p-4 pr-5 shadow-lg">
                <button
                  onClick={handleToggleRecruitment}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left outline-none focus:outline-none"
                >
                  {isPostClosed ? '모집 마감 해제' : '모집 마감'}
                </button>

                <button onClick={handleEdit} className="flex w-full items-center gap-2 px-4 py-2 text-left">
                  게시물 수정하기
                </button>

                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-500"
                >
                  게시물 삭제하기
                </button>

                {/* 닫기 버튼 */}
                <button onClick={handleCloseSheet} className="absolute right-[7px] top-[7px] text-center text-gray-500">
                  <CloseIcon width="16" height="16" />
                </button>
              </div>
            )}
          </div>

          {/* 채팅하기 버튼 */}
          <PostActionButtons title={title} postOwnerId={postOwnerId} isPostClosed={isPostClosed} postId={postId} />

          {/* 가로선 */}
          <hr className="mt-2 border-[#ECEDEE]" />
          <div className="mx-1 mt-5 whitespace-pre-line leading-6 desktop:mx-0">{content}</div>
        </div>
        {/* 봉사 참여자 목록 */}
        <ParticipantList postId={postId} postOwnerId={postOwnerId} />
      </div>
    </div>
  );
};

export default PostContent;
