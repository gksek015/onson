'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { useState } from 'react';
//import { supabase } from '@/utils/supabase/client';
//import {v4 as uuidv4} from 'uuid';
import { insertImageToPost, insertPost, uploadImage } from '@/lib/posts/insertPosts';
import type { FormData } from '@/types/formdata';

const NewPostComp = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    content: '',
    category: '',
    date: '',
    images: []
  });

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.content || !formData.date) {
        alert('필수 필드를 모두 입력하세요.'); // 필수 필드가 비어 있는 경우 알림
        return;
      }

      const userId = '08aa57ac-e595-4b97-a231-db81a5daa35c'; // 사용자 ID (로그인 후 토큰에서 가져오도록 개선 가능)
      const bucketName = 'images_bucket'; // Supabase 스토리지 버킷 이름

      // 게시물 삽입
      const post = await insertPost(formData, userId);

      // 이미지 업로드 및 이미지 테이블 삽입
      for (const image of formData.images) {
        const imageUrl = await uploadImage(image, bucketName);
        await insertImageToPost(post.id, imageUrl);
      }

      alert('봉사 요청이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('봉사 요청 등록 중 오류가 발생했습니다.');
    }
  };





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
