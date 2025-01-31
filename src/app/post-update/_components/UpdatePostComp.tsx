'use client';

import { Loading } from '@/components/common/Loading';
import { BackButtonIcon } from '@/components/icons/Icons';
import PostForm from '@/components/post/PostForm';
import { categories } from '@/constants/categories';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { useParams } from 'next/navigation';

const UpdatePostComp = () => {
  const { id: postId } = useParams();
  const { formData, setFormData, isAuthorized, loading, handleUpdate, navigateToDetail } = useUpdatePost(
    postId as string
  );

  if (loading) {
    return <Loading />;
  }

  return isAuthorized ? (
    <div className="min-h-screen items-center">
      <header className="relative flex items-center justify-center border-b px-4 py-3">
        <button type="button" onClick={navigateToDetail} className="absolute left-4">
          <BackButtonIcon />
        </button>
        <h1 className="text-center text-xl font-bold tracking-[-0.5px]">수정</h1>
        <button type="submit" onClick={handleUpdate} className="absolute right-4 text-xl font-medium text-[#424242]">
          수정
        </button>
      </header>

      <PostForm categories={categories} setFormData={setFormData} formData={formData} />
    </div>
  ) : (
    <p>수정 권한이 없습니다.</p>
  );
};

export default UpdatePostComp;
