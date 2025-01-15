'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { insertImageToPost, insertPost, uploadImage } from '@/lib/posts/insertPost';
import { getCurrentUserId } from '@/lib/posts/updatePost';
import type { FormData } from '@/types/formdata';
import { useEffect, useState } from 'react';

const NewPostComp = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    content: '',
    category: '',
    date: '',
    end_date: '',
    images: []
  });

  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getCurrentUserId();
      if (!id) {
        alert('로그인이 필요합니다. 로그인 후 다시 시도하세요.');
      }
      setUserId(id as string);
      setIsLoading(false);
    };

    fetchUserId();
  }, []);

  // image 타입 함수
  const isFile = (image: File | { img_url: string }): image is File => {
    return image instanceof File;
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('로그인이 필요합니다. 로그인 후 다시 시도하세요.');
      return;
    }
    try {
      if (!formData.title || !formData.content || !formData.date) {
        alert('필수 필드를 모두 입력하세요.');
        return;
      }
      const bucketName = 'images_bucket';

      // 게시물 삽입
      const post = await insertPost(formData, userId);

      for (const image of formData.images) {
        let imageUrl: string;

        if (isFile(image)) {
          imageUrl = await uploadImage(image, bucketName);
        } else {
          imageUrl = image.img_url;
        }

        // 이미지 테이블 삽입
        await insertImageToPost(post.id, imageUrl);
      }

      alert('봉사 요청이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('봉사 요청 등록 중 오류가 발생했습니다.');
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
        <PostForm categories={categories} setFormData={setFormData} />
      </main>
    </div>
  );
};

export default NewPostComp;
