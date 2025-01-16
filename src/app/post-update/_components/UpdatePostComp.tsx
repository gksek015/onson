'use client';

import { useParams } from 'next/navigation';
import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { useUpdatePost } from '@/hooks/useUpdatePost';

const UpdatePostComp = () => {
  const { id: postId } = useParams();
  const { formData, setFormData, isAuthorized, loading, handleUpdate } = useUpdatePost(postId as string);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return isAuthorized ? (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-bold">수정</h1>
        <button type="submit" onClick={handleUpdate} className="font-semibold text-blue-500">
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
