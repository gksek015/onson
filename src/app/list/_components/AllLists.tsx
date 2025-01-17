'use client';

import VolunteerCard from '@/components/home/VolunteerCard';
import useGetPostsbyFilter from '@/hooks/useGetPostsbyFilter';
import { useSearchParams } from 'next/navigation';

const AllLists = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || undefined; // 쿼리스트링에서 'address' 값 가져오기
  const category = searchParams.get('category') || undefined; // 쿼리스트링에서 'category' 값 가져오기
  const searchedKeyword = searchParams.get('searchedKeyword') || undefined; // 쿼리스트링에서 'searchedKeyword' 값 가져오기

  const { data: posts, isPending, isError } = useGetPostsbyFilter(address, category, searchedKeyword);

  // h1 타이틀 문구 결정
  let title = '';
  if (!isPending && posts?.length === 0) {
    title = ''; // 결과가 없으면 title을 비움
  } else if (searchedKeyword) {
    title = `${searchedKeyword}에 해당된 검색 결과입니다`;
  } else if (address || category) {
    title = `필터링 된 검색 결과입니다`;
  } else {
    title = `봉사 전체`;
  }

  return (
    <div className="w-full">
      {/* 동적 타이틀 */}
      <div className="flex flex-col items-start justify-center gap-1 self-stretch px-5 pb-1 pt-5">
        {title && <h1 className=" text-xl font-semibold">{title}</h1>}
      </div>

      {/* 로딩 중 상태 */}
      {isPending && <p>로딩 중...</p>}

      {/* 에러 메시지 */}
      {isError && <p className="text-red-500">에러발생</p>}

      {/* 게시물 리스트 */}
        {posts && posts.length ? (
          <ul>
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
