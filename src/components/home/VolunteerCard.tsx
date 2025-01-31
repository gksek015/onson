'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { useGetPostById } from '@/hooks/useGetPostById';
import type { PostType } from '@/types/PostType';
import { useUserStore } from '@/utils/store/userStore';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { MapPinIcon } from '../icons/Icons';

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
      <div className="flex w-full flex-row items-start gap-3.5 self-stretch border-b border-[#e7e7e7] px-5 py-8">
        <Link href={`/detail/${post.id}/?from=list`} className="w-full">
          {/* 태그 */}
          <div className="mb-[8px] flex w-full flex-wrap items-center gap-[8px] text-sm font-normal">
            {post.completed ? (
              <span className="flex items-center justify-center gap-2 rounded-full border bg-[#808080] px-2.5 py-0.5 text-sm text-white">
                모집 마감
              </span>
            ) : (
              <span className="hidden"></span>
            )}
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]">
              {post.category}
            </span>
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]">
              {`${formattedStart}~${formattedEnd}`}
            </span>
          </div>

          <div className="flex w-full flex-1 items-start justify-between gap-2">
            <div className="flex flex-1 flex-col items-start gap-[8px]">
              {/* 제목 */}
              <div className="tracking-custom text-lg font-medium leading-7 text-black">{post.title}</div>
              {/* 주소 */}
              <div className="flex items-center gap-[8px] self-stretch">
                <MapPinIcon />
                <span className="text-sm text-[#4d4d4d]">
                  {post.si} {post.gu} {post.dong}
                </span>
              </div>
              {/* 작성자 */}
              <div className="flex items-start gap-3 self-stretch text-sm leading-4 text-[#7e7e7e]">
                <span>{post.users.nickname}</span>
                <span>{post.created_at.split('T')[0]}</span>
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
      </div>
      {/* 현재 경로에 따라 다르게 버튼 추가 */}
      {currentPath === '/my-page/bookmarks' && (
        <>
          <div className="flex justify-between px-[20px] py-[12px]">
            <button onClick={handleRemoveBookmark}>삭제</button>
          </div>
          <div className="my_profile_blank"></div>
        </>
      )}
      {currentPath === '/my-page/my-posts' && (
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
