'use client';

import { Loading } from '@/components/common/Loading';
import Header from '@/components/post-form/Header';
import PostForm from '@/components/post-form/PostForm';
import { categories } from '@/constants/categories';
import { usePostForm } from '@/hooks/usePostForm';
import { useRouter } from 'next/navigation';

const NewPostComp = () => {
  const { formData, setFormData, isLoading, isFormValid, handleSubmit } = usePostForm();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
      <Header
        title="봉사요청"
        onBack={handleBack}
        onSubmit={handleSubmit}
        submitLabel="등록"
        isSubmitDisabled={!isFormValid()}
      />
      <PostForm categories={categories} setFormData={setFormData} formData={formData} />
    </div>
  );
};

export default NewPostComp;
