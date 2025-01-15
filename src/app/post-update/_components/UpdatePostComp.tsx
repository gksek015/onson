'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { getCurrentUserId, getPost, updatePostById } from '@/lib/posts/updatePost';
import type { FormData } from '@/types/formdata';
import { useEffect, useState } from 'react';

const UpdatePostComp = () => {
  const postId = '2a9cc6c1-eaca-47e6-acef-df451d450775';
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    category: '',
    date: '',
    end_date: '',
    content: '',
    images: []
  });
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 현재 사용자 ID 가져오기
        const currentUserId = await getCurrentUserId();
        if (!currentUserId) {
          alert('로그인이 필요합니다.');
          return;
        }

        // 게시글 데이터 가져오기
        const post = await getPost(postId as string);
        if (!post) {
          alert('게시글을 찾을 수 없습니다.');
          return;
        }

        // 작성자와 현재 사용자 비교
        if (post.user_id !== currentUserId) {
          alert('수정 권한이 없습니다.');
          setIsAuthorized(false);
          return;
        }

        const fullAddress = `${post.si} ${post.gu} ${post.dong}`;

        setFormData({
          title: post.title,
          address: fullAddress,
          category: post.category,
          date: post.date,
          end_date:post.end_date,
          content: post.content,
          images: post.images || []
        });
        setIsAuthorized(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleUpdate = async () => {
    if (!isAuthorized) {
      alert('수정 권한이 없습니다.');
      return;
    }

    const success = await updatePostById(postId as string, formData);
    if (success) {
      alert('게시글이 수정되었습니다.');
    } else {
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return isAuthorized ? (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-bold">수정</h1>
        <button type="submit" onClick={handleUpdate} className="font-semibold text-blue-500">
          수정
        </button>
      </header>

      <main className="p-4">
        <PostForm categories={categories} setFormData={setFormData} />
      </main>
    </div>
  ) : (
    <p>수정 권한이 없습니다.</p>
  );
};

export default UpdatePostComp;
