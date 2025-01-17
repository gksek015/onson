'use client';

import { useParams, useRouter } from 'next/navigation';
import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { BackButtonIcon } from '@/components/icons/Icons';

const UpdatePostComp = () => {
  const { id: postId } = useParams();
  const { formData, setFormData, isAuthorized, loading, handleUpdate, navigateToDetail } = useUpdatePost(postId as string);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return isAuthorized ? (
    <div className="min-h-screen items-center">
      <header className="flex items-center justify-center border-b px-4 py-3 relative">
        <button type='button' onClick={navigateToDetail} className='absolute left-4'>
        <BackButtonIcon/>
        </button>
        <h1 className="text-lg font-bold text-center">수정</h1>
        <button type="submit" onClick={handleUpdate} className="absolute right-4 font-semibold text-gray-500">
          수정
        </button>
      </header>

      <main>
        <PostForm categories={categories} setFormData={setFormData} formData={formData} />
      </main>
    </div>
  ) : (
    <p>수정 권한이 없습니다.</p>
  );
};

export default UpdatePostComp;
