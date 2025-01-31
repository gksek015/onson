'use client';

import { Loading } from '@/components/common/Loading';
import { BackIcon } from '@/components/icons/Icons';
import PostForm from '@/components/post/PostForm';
import { categories } from '@/constants/categories';
import { usePostForm } from '@/hooks/usePostForm';
import { useRouter } from 'next/navigation';

const NewPostComp = () => {
  const { formData, setFormData, isLoading, isFormValid, handleSubmit } = usePostForm();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-10 flex w-full max-w-content items-center justify-center border-b bg-white px-4 py-3">
        <button onClick={() => router.back()} className="absolute left-4">
          <BackIcon />
        </button>
        <h1 className="text-xl font-bold tracking-[-0.5px]">봉사요청</h1>
        <button
          type="submit"
          onClick={isFormValid() ? handleSubmit : undefined}
          className={`absolute right-4 text-xl font-medium ${isFormValid() ? 'text-[var(--primary-3)]' : 'text-[#B4B4B4]'} `}
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
