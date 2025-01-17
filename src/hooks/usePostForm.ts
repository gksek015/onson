import { insertImageToPost, insertPost, uploadImage } from '@/lib/posts/insertPost';
import type { FormData } from '@/types/formdata';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const usePostForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    content: '',
    category: '',
    date: '',
    end_date: '',
    images: [],
    deletedImages: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoggedIn } = useUserStore();
  const router = useRouter();

  const isFormValid = useCallback((): boolean => {
    return (
      formData.title.trim() !== '' &&
      formData.content.trim() !== '' &&
      formData.date.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.category.trim() !== ''
    );
  }, [formData]);

  useEffect(() => {
    if (!isLoggedIn()) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '글을 작성하시려면 로그인이 필요합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하러 가기',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  const handleSubmit = useCallback(async () => {
    if (!user || !user.id) {
      Swal.fire({
        title: '유효하지 않은 사용자입니다.',
        icon: 'warning',
      });
      return;
    }

    if (!isFormValid()) {
      Swal.fire({
        title: '필수 필드를 입력해주세요.',
        icon: 'warning',
      });
      return;
    }

    try {
      const bucketName = 'images_bucket';

      // 게시물 삽입
      const post = await insertPost(formData, user.id);

      const remainingImages = formData.images.filter((img) => {
        return !(
          typeof img === 'object' &&
          'img_url' in img &&
          formData.deletedImages.includes(img.img_url)
        );
      });

      for (const image of remainingImages) {
        const imageUrl =
          image instanceof File
            ? await uploadImage(image, bucketName)
            : image.img_url;

        await insertImageToPost(post.id, imageUrl);
      }

      Swal.fire({
        title: '봉사 요청이 성공적으로 등록되었습니다!',
        icon: 'success',
      });

      router.push(`/detail/${post.id}`);
    } catch (error) {
      console.error('Error submitting post:', error);
      Swal.fire({
        title: '봉사 요청 중 에러가 발생했습니다.',
        icon: 'warning',
      });
    }
  }, [formData, isFormValid, user, router]);

  return {
    formData,
    setFormData,
    isLoading,
    isFormValid,
    handleSubmit,
  };
};
