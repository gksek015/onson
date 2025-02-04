'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { useGetPostById } from '@/hooks/useGetPostById';
import type { PostType } from '@/types/PostType';
import { useUserStore } from '@/utils/store/userStore';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, MyProfileIcon } from '../../components/icons/Icons';

import useIsMobile from '@/hooks/ui/useIsMobile';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface VolunteerCardProps {
  post: PostType;
}

const VolunteerCard = ({ post }: VolunteerCardProps) => {
  const [currentPath, setCurrentPath] = useState<string>('');
  const user = useUserStore((state) => state.user); // ✅ 현재 로그인한 사용자 정보 가져오기
  const { removeBookmark } = useBookmarks(user?.id || '');
  const router = useRouter();
  const { deletePostById } = useGetPostById(post.id);
  const queryClient = useQueryClient();

  //브라우저 좌우 사이즈 상태 및 변경
  const isMobile = useIsMobile();

  // 현재 경로를 가져오기 위한 useEffect
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  let firstImg = null;
  if (post.images && post.images.length > 0) {
    firstImg = post.images[0].img_url;
  }

  const formattedStart = dayjs(post.date).format('YY.MM.DD.');
  const formattedEnd = dayjs(post.end_date).format('YY.MM.DD.');

  const isPastEndDate = dayjs(post.end_date).isBefore(dayjs(), 'day'); // 오늘이 end_date 이후인지 확인
  const isCloseToEndDate = dayjs(post.end_date).diff(dayjs(), 'day') <= 2 && !isPastEndDate; // 오늘 기준 이틀 이하 인지 확인

  const handleRemoveBookmark = () => {
    if (!user?.id) {
      alert('로그인이 필요합니다.');
      return;
    }
    removeBookmark({ userId: user.id, postId: post.id });
  };

  const handleEdit = () => {
    router.push(`/post-update/${post.id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: `게시물 삭제`,
      text: `정말 삭제하시겠습니까?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostById.mutate(post.id, {
          onSuccess: () => {
            // 삭제 후 관련 데이터를 무효화
            queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.push('/list');
          }
        });
      }
    });
    return;
  };

  return (
    <>
      {/* <li className="flex w-full items-start self-stretch bg-white px-5 py-8"> */}
      <li className="flex w-full items-start desktop:border rounded-xl self-stretch bg-white px-5 py-8">
        <Link href={`/detail/${post.id}/?from=list`} className="w-full">
          {/* 태그 */}
          <div className="mb-2 flex w-full flex-wrap items-center gap-2 text-sm font-normal">
            {post.completed ? (
              <span className="flex items-center justify-center gap-2 rounded-full border bg-[#A6A6A6] px-2.5 py-0.5 text-sm text-white">
                모집 마감
              </span>
            ) : (
              <span className="hidden"></span>
            )}
            {isCloseToEndDate && !post.completed && !isPastEndDate && (
              <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFEBE5] px-2.5 py-0.5 text-sm text-[#FF0000]">
                마감 임박 봉사
              </span>
            )}
            <span
              className={
                'flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]'
              }
            >
              {post.category}
            </span>
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]">
              {`${formattedStart}~${formattedEnd}`}
            </span>
          </div>

          <div className="flex w-full flex-1 items-start justify-between gap-2">
            <div className="flex flex-1 flex-col items-start gap-2">
              {/* 제목 */}
              <div className="text-lg font-medium leading-7 tracking-custom text-black">{post.title}</div>
              {/* 주소 */}
              <div className="flex items-center gap-[8px] self-stretch">
                <MapPinIcon />
                <span className="text-sm text-[#4d4d4d]">
                  {post.si} {post.gu} {post.dong}
                </span>
              </div>
              {/* 작성자 */}
              <div className="flex items-center gap-2 self-stretch text-sm leading-4 text-[#7e7e7e]">
                {post.users.profile_img_url ? (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={post.users.profile_img_url}
                      alt={`${post.users.nickname}의 프로필 이미지`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <MyProfileIcon width="24" height="24" />
                )}
                <span>{post.users.nickname}</span>
              </div>
            </div>

            {/* 이미지 */}
            {firstImg && (
              <div className="relative flex h-20 w-20 items-center self-end">
                <Image
                  src={firstImg}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
                {post.completed && (
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="inline-flex rounded-md bg-white bg-opacity-20 px-2.5 py-1">
                      <span className="text-xs font-medium text-white">모집마감</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Link>
      </li>
      {/* 현재 경로에 따라 다르게 버튼 추가 */}
      {isMobile && currentPath === '/my-page/bookmarks' && (
        <>
          <div className="flex justify-between px-[20px] py-[12px]">
            <button onClick={handleRemoveBookmark}>삭제</button>
          </div>
          <div className="my_profile_blank"></div>
        </>
      )}
      {isMobile && currentPath === '/my-page/my-posts' && (
        <>
          <div className="flex justify-between px-[20px] py-[12px]">
            <button onClick={handleDelete}>삭제</button>
            <button className="text-[#FB657E]" onClick={handleEdit}>
              수정
            </button>
          </div>
          <div className="my_profile_blank"></div>
        </>
      )}
    </>
  );
};

export default VolunteerCard;
