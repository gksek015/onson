'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { usePostForm } from '@/hooks/usePostForm';

const NewPostComp = () => {
  const { formData, setFormData, isLoading, isFormValid, handleSubmit } = usePostForm();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="min-h-screen items-center">
      <header className="flex items-center justify-center border-b px-4 py-3 relative">
        <h1 className="text-lg font-bold text-center">봉사 요청</h1>
        <button
          type="submit"
          onClick={isFormValid() ? handleSubmit : undefined}
          className={`absolute right-4 font-semibold ${
            isFormValid() ? 'text-[#4E4E4E]' : 'text-[#B4B4B4]'
          }
          `}
          disabled={!isFormValid()}
        >
          등록
        </button>
      </header>

      <main>
        <PostForm categories={categories} setFormData={setFormData} formData={formData} />
      </main>
    </div>
  );
};

export default NewPostComp;
