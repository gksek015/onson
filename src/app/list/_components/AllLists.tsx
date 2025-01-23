'use client';

import { Loading } from '@/components/common/Loading';
import VolunteerCard from '@/components/home/VolunteerCard';
import { WarningIcon } from '@/components/icons/Icons';
import useGetPostsbyFilter from '@/hooks/useGetPostsbyFilter';
import { getInfinitePost } from '@/lib/posts/getInfinitePost';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

const AllLists = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || undefined; // 쿼리스트링에서 'address' 값 가져오기
  const category = searchParams.get('category') || undefined; // 쿼리스트링에서 'category' 값 가져오기
  const searchedKeyword = searchParams.get('searchedKeyword') || undefined; // 쿼리스트링에서 'searchedKeyword' 값 가져오기

  const { data: filteredPosts } = useGetPostsbyFilter(address, category, searchedKeyword);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: ({ pageParam = 0 }) => getInfinitePost({ pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor || undefined,
    initialPageParam: 0
  });

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });

  // 이전에 메시지가 표시되었는지 여부를 추적하기 위한 useRef 사용
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    // 주소가 있고, 이전에 토스트 메시지를 표시한 적이 없는 경우에만 메시지를 표시
    if (address && !hasShownToastRef.current) {
      toast('위치태그를 누르면 지역을 다시 설정할 수 있어요', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        closeButton: false
      });
      hasShownToastRef.current = true; // 토스트가 표시되었음을 기록
    }
  }, [address]);

  if (!posts) {
    return;
  }

  return (
    <div className="w-full">
      {/* 동적 타이틀 */}
      <div className="flex flex-col items-start justify-center gap-1 self-stretch px-5 pb-1 pt-5">
        {searchedKeyword ? (
          <h1 className="text-xl font-semibold">{`${searchedKeyword}에 해당된 검색 결과입니다`}</h1>
        ) : address || category ? (
          <h1 className="text-xl font-semibold">필터링 된 검색 결과입니다</h1>
        ) : (
          <h1 className="text-xl font-semibold">봉사 전체</h1>
        )}
      </div>

      {/* 로딩 중 상태 */}
      {isLoading && <Loading />}

      {/* 에러 메시지 */}
      {isError && <p className="text-red-500">에러발생</p>}

      {/* 게시글 리스트 */}
      {address || category || searchedKeyword ? (
        <ul>{filteredPosts?.map((post) => <VolunteerCard key={post.id} post={post} />)}</ul>
      ) : (
        // 모든 게시물 리스트를 보여줌
        <ul>
          {posts.pages.map((page, pageIndex) => (
            <div key={pageIndex}>{page?.post.map((p) => <VolunteerCard key={p.id} post={p} />)}</div>
          ))}
          <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
        </ul>
      )}

      {/* 아무 결과가 없을 때 */}
      {(!address || !category || !searchedKeyword || !posts) && (
        <div className="flex h-full flex-col items-center justify-center pt-40">
          <div className="mb-4">
            <WarningIcon />
          </div>
          <p className="text-base text-[#C5C5C5]">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AllLists;
