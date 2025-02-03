'use client';

import { Loading } from '@/components/common/Loading';
import Header from '@/components/post-form/Header';
import PostForm from '@/components/post-form/PostForm';
import { categories } from '@/constants/categories';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { useParams } from 'next/navigation';

const UpdatePostComp = () => {
  const { id: postId } = useParams();
  const { formData, setFormData, isAuthorized, loading, handleUpdate, navigateToDetail } = useUpdatePost(postId as string);

  if (loading) return <Loading />;

  return isAuthorized ? (
    <div className="min-h-screen">
      <Header
        title="수정"
        onBack={navigateToDetail} // 게시글 상세 페이지로 이동
        onSubmit={handleUpdate}
        submitLabel="수정"
        submitColor="#424242"
        isUpdatePage={true} // 수정 페이지임을 `Header.tsx`에 전달하여 알림 표시
      />
      <PostForm categories={categories} setFormData={setFormData} formData={formData} />
    </div>
  ) : (
    <p>수정 권한이 없습니다.</p>
  );
};

export default UpdatePostComp;
