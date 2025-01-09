'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { useState } from 'react';

import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface FormData {
  title: string;
  address: string;
  content: string;
  category: string[];
  date: string | null;
  images: File[]; // 이미지 파일 배열
}

const NewPostComp = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    content: '',
    category: [],
    date: null,
    images: []
  });

  const handleSubmit = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        alert('사용자가 로그인되지 않았습니다.');
        return;
      }

      // 1. posts 테이블에 데이터 추가
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          date: formData.date,
          address: formData.address,
          user_id: user.id, // 로그인한 사용자 ID
          completed: false
        })
        .select() // 삽입된 데이터 반환
        .single();

      if (postError) throw postError;

      // 2. images 테이블에 데이터 추가 (storage에 업로드 후)
      for (const image of formData.images) {
        const { error: imageError } = await supabase.storage
          .from('images_bucket')
          .upload(`public/${image.name}`, image);

        if (imageError) throw imageError;

        const imageUrl = supabase.storage.from('images_bucket').getPublicUrl(`public/${image.name}`).data.publicUrl;

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
        <button type="button" onClick={handleSubmit} className="font-semibold text-blue-500">
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
