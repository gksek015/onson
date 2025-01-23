'use client';

import { useParams } from 'next/navigation';
import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { BackButtonIcon } from '@/components/icons/Icons';
import { Loading } from '@/components/common/Loading';

const UpdatePostComp = () => {
  const { id: postId } = useParams();
  const { formData, setFormData, isAuthorized, loading, handleUpdate, navigateToDetail } = useUpdatePost(postId as string);

  if (loading) {
    return (
    <Loading/>
  );
  }

  return isAuthorized ? (
    <div className="min-h-screen items-center">
      <header className="flex items-center justify-center border-b px-4 py-3 relative">
        <button type='button' onClick={navigateToDetail} className='absolute left-4'>
        <BackButtonIcon/>
        </button>
        <h1 className="text-xl font-bold text-center tracking-[-0.5px]">수정</h1>
        <button type="submit" onClick={handleUpdate} className=" text-xl font-medium absolute right-4 text-[#424242]">
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
