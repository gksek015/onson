'use client';

import VolunteerCard from '@/app/(home)/VolunteerCard';
import { Loading } from '@/components/common/Loading';
import { WarningIcon } from '@/components/icons/Icons';
import useGetPostsbyFilter from '@/hooks/useGetPostsbyFilter';
import { getInfinitePost } from '@/lib/posts/getInfinitePost';
import { PostType } from '@/types/PostType';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

const AllLists = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || undefined;
  const category = searchParams.get('category') || undefined;
  const searchedKeyword = searchParams.get('searchedKeyword') || undefined;
  const [isOnlyOpen, setIsOnlyOpen] = useState(false); // 체크박스 상태 (모집 중인 게시글만 보기)

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
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor || undefined;
    },
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor || undefined,
    initialPageParam: 0
  });

  const { ref, inView } = useInView({
    threshold: 0
  });

  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      // 다음 데이터 불러오는 로직
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
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
      hasShownToastRef.current = true;
    }
  }, [address]);

  // 모집중 필터링 로직
  const filterByStatus = (posts: PostType[]) => {
    if (isOnlyOpen) {
      return posts.filter((post) => !post.completed); // 모집 완료되지 않은 게시물만 반환
    }
    return posts; // 모든 게시물 반환
  };

  // 필터링된 게시물을 가져옴 (주소, 카테고리, 검색어가 있을 때와 없을 때를 나눔)
  const filteredData =
    address || category || searchedKeyword
      ? filterByStatus((filteredPosts || []) as PostType[])
      : posts?.pages.flatMap((page) => filterByStatus((page?.post || []) as PostType[])) || [];

  return (
    <div className="mx-auto w-full desktop:w-[1280px]">
      <div className="flex flex-col items-start justify-center gap-1 self-stretch px-5 pb-1 pt-5 desktop:pt-10">
        {searchedKeyword ? (
          <h1 className="text-xl font-semibold">{`${searchedKeyword}에 해당된 검색 결과입니다`}</h1>
        ) : address || category ? (
          <h1 className="text-xl font-semibold">필터링 된 검색 결과입니다</h1>
        ) : (
          <h1 className="text-xl font-semibold">봉사 전체</h1>
        )}
      </div>

      <div className="flex items-center px-5 py-2 desktop:pb-6">
        <label htmlFor="filter-recruiting" className="flex items-center gap-2 text-sm">
          <input
            id="filter-recruiting"
            type="checkbox"
            checked={isOnlyOpen}
            onChange={(e) => setIsOnlyOpen(e.target.checked)}
            className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          모집 중인 게시글만 보기
        </label>
      </div>

      {isLoading && <Loading />}

      {isError && <p className="text-red-500">에러발생</p>}

      {/* <ul className="grid grid-cols-1 gap-[1px] bg-[#e7e7e7] md:grid-cols-2 lg:grid-cols-3"> */}
      <ul className="grid grid-cols-1 desktop:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((post) => (
          <VolunteerCard key={post.id} post={post} />
        ))}
      </ul>
      <div ref={ref}>{isFetchingNextPage && <Loading />}</div>

      {!isLoading && filteredData.length === 0 && (
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
