'use client';

import { Loading } from '@/components/common/Loading';
import { BackIcon } from '@/components/icons/Icons';
import PostForm from '@/components/post/PostForm';
import { categories } from '@/constants/categories';
import { usePostForm } from '@/hooks/usePostForm';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const NewPostComp = () => {
  const { formData, setFormData, isLoading, isFormValid, handleSubmit } = usePostForm();
  const router = useRouter();

  const handleBackButton = () => {
    Swal.fire({
      title: '작성 중인 내용이 삭제됩니다.',
      text: '정말 취소하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary-3)',
      cancelButtonColor: '#B4B4B4',
      confirmButtonText: '취소',
      cancelButtonText: '아니오',
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.back();
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <header className="h-[60px] fixed top-0 left-1/2 -translate-x-1/2 z-10 flex w-full max-w-content items-center justify-center border-b bg-white px-4 py-3">
        <button onClick={handleBackButton} className="absolute left-4">
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
