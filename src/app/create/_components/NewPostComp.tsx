'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { insertImageToPost, insertPost, uploadImage } from '@/lib/posts/insertPost';
import { getCurrentUserId } from '@/lib/posts/updatePost';
import type { FormData } from '@/types/formdata';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const NewPostComp = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    content: '',
    category: '',
    date: '',
    end_date: '',
    images: [],
    deletedImages: []
  });

  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getCurrentUserId();
      if (!id) {
        Swal.fire({
          title: '로그인이 필요합니다',
          text: '글을 작성하시려면 로그인이 필요합니다.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '로그인하러 가기',
          cancelButtonText: '취소'
        }).then((result) => {
          if (result.isConfirmed) {
            // 로그인 페이지로 이동
            router.push('/login');
          }
        });
      }
      setUserId(id as string);
      setIsLoading(false);
    };

    fetchUserId();
  }, [router]);

  const handleSubmit = async () => {
    if (!userId) {
      Swal.fire({
        title: '해당 유저가 작성한 게시글이 아닙니다.',
        icon: 'warning',
      });
      return;
    }
    try {
      if (!formData.title || !formData.content || !formData.date) {
        Swal.fire({
          title: '모든 필드를 입력해주세요.',
          icon: 'warning',
        });
        return;
      }
      const bucketName = 'images_bucket';

      // 게시물 삽입
      const post = await insertPost(formData, userId);

      const remainingImages = formData.images.filter((img) =>
        !(typeof img === 'object' && 'img_url' in img && formData.deletedImages.includes(img.img_url))
      );
    
      for (const image of remainingImages) {
        let imageUrl: string;
    
        if (image instanceof File) {
          imageUrl = await uploadImage(image, bucketName);
        } else {
          imageUrl = image.img_url;
        }
    
        await insertImageToPost(post.id, imageUrl);
      }

      Swal.fire({
        title: '봉사 요청이 성공적으로 등록되었습니다!',
        icon: 'success',
      });

      router.push(`/detail/${post.id}`)
    } catch (error) {
      console.error('Error submitting post:', error);
      Swal.fire({
        title: '봉사 요청 중 에러가 발생했습니다.',
        icon: 'warning',
      });
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!userId) {
    return <div>로그인이 필요한 페이지입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-bold">봉사 요청</h1>
        <button type="submit" onClick={handleSubmit} className="font-semibold text-blue-500">
          등록
        </button>
      </header>

      <main className="p-4">
        <PostForm categories={categories} setFormData={setFormData} formData={formData}/>
      </main>
    </div>
  );
};

export default NewPostComp;
