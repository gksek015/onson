'use client';

import PostForm from '@/components/common/post/PostForm';
import { BackIcon } from '@/components/icons/Icons';
import { categories } from '@/data/categories';
import { usePostForm } from '@/hooks/usePostForm';
import { useRouter } from 'next/navigation';

const NewPostComp = () => {
  const { formData, setFormData, isLoading, isFormValid, handleSubmit } = usePostForm();
  const router = useRouter();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="min-h-screen items-center">
      <header className="relative flex items-center justify-center border-b px-4 py-3">
        <button onClick={() => router.back()} className="absolute left-4">
          <BackIcon />
        </button>
        <h1 className="text-center text-lg font-bold">봉사 요청</h1>
        <button
          type="submit"
          onClick={isFormValid() ? handleSubmit : undefined}
          className={`absolute right-4 font-semibold ${isFormValid() ? 'text-[#4E4E4E]' : 'text-[#B4B4B4]'} `}
          disabled={!isFormValid()}
        >
          등록
        </button>
      </header>

      <PostForm categories={categories} setFormData={setFormData} formData={formData} />
    </div>
  );
};

export default NewPostComp;
