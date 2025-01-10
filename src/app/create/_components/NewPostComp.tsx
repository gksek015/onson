'use client';

import { useState } from 'react';
import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { supabase } from '@/utils/supabase/client';
import {v4 as uuidv4} from 'uuid';

interface FormData {
  title: string;
  address: string;
  content: string;
  category: string;
  date: string;
  images: File[];
}

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
        alert('필수 필드를 모두 입력하세요.');
        return;
      }
      
      // const {
      //   data: { user }
      // } = await supabase.auth.getUser();

      // if (!user) {
      //   alert('사용자가 로그인되지 않았습니다.');
      //   return;
      // }

      // 1. posts 테이블에 데이터 추가
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          date: formData.date,
          address: formData.address,
          user_id: '08aa57ac-e595-4b97-a231-db81a5daa35c', //user.id, // 로그인한 사용자 ID
          completed: false
        })
        .select() // 삽입된 데이터 반환
        .single();

      if (postError) throw postError;

      // 2. images 테이블에 데이터 추가 (storage에 업로드 후)
      for (const image of formData.images) {
        // 완전한 랜덤 UUID로 파일 이름 생성
        const filename = `${uuidv4()}.${image.name.split('.').pop()}`;
  
        const { error: imageError } = await supabase.storage
          .from('images_bucket')
          .upload(filename, image);
  
        if (imageError) {
          console.error('Image upload error:', imageError.message);
          alert('이미지 업로드 중 오류가 발생했습니다.');
          return;
        }
  
        // 이미지의 public URL 가져오기
        const { data: publicUrlData } = supabase.storage.from('images_bucket').getPublicUrl(filename);
        const imageUrl = publicUrlData.publicUrl;
  
        // images 테이블에 이미지 URL 추가
        const { error: imageInsertError } = await supabase.from('images').insert({
          post_id: post.id,
          img_url: imageUrl
        });
  
        if (imageInsertError) throw imageInsertError;
      }

      alert('봉사 요청이 성공적으로 등록되었습니다!');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting post:', error.message);
        alert('봉사 요청 등록 중 오류가 발생했습니다.');
      }
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
