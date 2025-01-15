'use client';

import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';
import { getCurrentUserId, getPost, updatePostById } from '@/lib/posts/updatePost';
import type { FormData } from '@/types/formdata';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UpdatePostComp = () => {
  const { id: postId } = useParams();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    address: '',
    category: '',
    date: '',
    end_date: '',
    content: '',
    images: [],
    deletedImages: []
  });
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 현재 사용자 ID 가져오기
        const currentUserId = await getCurrentUserId();
        if (!currentUserId) {
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
          return;
        }

        // 게시글 데이터 가져오기
        const post = await getPost(postId as string);
        if (!post) {
          Swal.fire({
            title: '게시글을 찾을 수 없습니다.',
            icon: 'warning'
          });
          return;
        }

        // 작성자와 현재 사용자 비교
        if (post.user_id !== currentUserId) {
          Swal.fire({
            title: '수정 권한이 없습니다.',
            icon: 'warning'
          });
          setIsAuthorized(false);
          return;
        }

        const fullAddress = `${post.si} ${post.gu} ${post.dong}`;

        setFormData({
          title: post.title,
          address: fullAddress,
          category: post.category,
          date: post.date,
          end_date: post.end_date,
          content: post.content,
          images: post.images || [],
          deletedImages: []
        });
        setIsAuthorized(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [router, postId]);

  const handleUpdate = async () => {
    if (!isAuthorized) {
      Swal.fire({
        title: '수정 권한이 없습니다.',
        icon: 'warning'
      });
      return;
    }

    try {
      const postUpdateSuccess = await updatePostById(postId as string, formData);
      if (!postUpdateSuccess) {
        Swal.fire({
          title: '게시글 수정에 실패했습니다.',
          icon: 'warning'
        });
        return;
      }

      Swal.fire({
        title: '게시글이 수정되었습니다.',
        icon: 'success'
      });
      router.push(`/detail/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
      Swal.fire({
        title: '수정 중 오류가 발생했습니다.',
        icon: 'warning'
      });
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
        <PostForm categories={categories} setFormData={setFormData} formData={formData} />
      </main>
    </div>
  ) : (
    <p>수정 권한이 없습니다.</p>
  );
};

export default UpdatePostComp;
