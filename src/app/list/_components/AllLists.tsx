'use client';

import VolunteerCard from '@/components/home/VolunteerCard';
import useGetPostsbyAddress from '@/hooks/useGetPostsbyAddress';
import { useSearchParams } from 'next/navigation';

const AllLists = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || undefined; // 쿼리스트링에서 'address' 값 가져오기

  const { data: posts, isPending, isError } = useGetPostsbyAddress(address);

  const addressList = address?.split('_');
  const dong = addressList ? addressList[2] : '';

  return (
    <div className="p-4">
      {address ? (
        <h1 className="mb-4 text-lg font-bold">{`${dong} 봉사 활동`}</h1>
      ) : (
        <h1 className="mb-4 text-lg font-bold">봉사 전체</h1>
      )}
      {/* 로딩 중 상태 */}
      {isPending && <p>로딩 중...</p>}

      {/* 에러 메시지 */}
      {isError && <p className="text-red-500">에러발생</p>}

      {/* 게시물 리스트 */}
      {posts && posts.length ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <VolunteerCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        !isPending && <p>해당 게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default AllLists;
