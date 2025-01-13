'use client';

import VolunteerCard from '@/components/home/VolunteerCard';
import type { PostType } from '@/types/PostType';
import { supabase } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AllLists = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get('address'); // 쿼리스트링에서 'address' 값 가져오기
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase.from('posts').select(`*, images(img_url)`);

        if (address) {
          // 검색된 주소가 있는 경우
          const addressList = address.split('_');
          if (addressList.length === 3) {
            query = query
              .ilike('si', addressList[0]) // si 일치 조건
              .ilike('gu', addressList[1]) // gu 일치 조건
              .ilike('dong', addressList[2]); // dong 일치 조건
          }
        } else {
          // 검색된 주소가 없는 경우 전체 리스트
          query = query.order('created_at', { ascending: false }); // 최신순 정렬
        }

        const { data: postsData, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError; // 에러 발생시 처리
        }

        setPosts(postsData || []); // 가져온 데이터를 상태로 설정
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('게시물을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchPosts();
  }, [address]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">게시물 리스트</h1>

      {/* 로딩 중 상태 */}
      {loading && <p>로딩 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 게시물 리스트 */}
      {posts?.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <VolunteerCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        !loading && <p>해당 게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default AllLists;
