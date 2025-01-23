'use client';

import { BackButtonIcon, MeatballMenuIcon, PencilIcon, RecruitmentIcon, TrashBinIcon } from '@/components/icons/Icons';
import { useGetPostById } from '@/hooks/useGetPostById';
import { useUserStore } from '@/utils/store/userStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet-updated';
import 'react-spring-bottom-sheet-updated/dist/style.css';
import Swal from 'sweetalert2';

interface PostDetailProps {
  postPageId: string;
}

const Header = ({ postPageId }: PostDetailProps) => {
  const { data: post, deletePostById, updateCompletedById } = useGetPostById(postPageId);
  const { user } = useUserStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleBack = () => {
    router.push('/list');
  };

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const handleEdit = () => {
    router.push(`/post-update/${postPageId}`);
  };

  const handleDelete = () => {
    closeSheet();
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
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.push('/list');
          }
        });
      }
    });
    return;
  };

  const handleToggleRecruitment = () => {
    updateCompletedById.mutate(postPageId, {
      onSuccess: () => {
        // 모집 마감 업데이트 성공 시 관련 데이터 무효화
        queryClient.invalidateQueries({ queryKey: ['posts'] }); // 게시물 리스트 쿼리 무효화
      }
    });
    closeSheet();
  };

  return (
    <div className="flex items-center justify-between border-b px-2 py-2 h-12">
      <button onClick={handleBack}>
        <BackButtonIcon />
      </button>

      {/* 수정 삭제 버튼은 로그인 유저가 포스트 유저와 같은 id일때만 보여줌. */}
      {user?.id === post?.user_id && (
        <button onClick={openSheet}>
          <MeatballMenuIcon />
        </button>
      )}

      {/* 바텀 시트*/}
      <BottomSheet
        open={isSheetOpen}
        onDismiss={closeSheet}
        snapPoints={({ maxHeight }) => [maxHeight * 0.3, maxHeight * 0.4]} // 스냅 포인트 설정(참고로 첫번째는 처음 열리는 위치, 두번쨰는 사용자가 올릴 수 있는 만큼 올린 위치임)
        defaultSnap={({ maxHeight }) => maxHeight * 0.3} // 기본 열림 위치 설정
      >
        <div className="p-4">
          <button onClick={handleToggleRecruitment} className="flex w-full items-center gap-2 px-4 py-2 text-left">
            <RecruitmentIcon />
            {post?.completed ? '모집 마감 해제' : '모집 마감'}
          </button>
          <button onClick={handleEdit} className="flex w-full items-center gap-2 px-4 py-2 text-left">
            <PencilIcon />
            게시물 수정하기
          </button>
          <button onClick={handleDelete} className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-500">
            <TrashBinIcon />
            게시물 삭제하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Header;
