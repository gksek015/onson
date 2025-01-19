import { getPostbyFilter } from '@/lib/posts/getPostbyFilter';
import type { PostType } from '@/types/PostType';
import { useQuery } from '@tanstack/react-query';

const useGetPostsbyFilter = (address?: string, category?: string, searchedkeyword?: string) => {
  // queryKey를 객체 형태로 구조화
  const queryKey = ['posts', { address, category, searchedkeyword }];

  const { data, isPending, isError } = useQuery<PostType[]>({
    queryKey,
    queryFn: () => getPostbyFilter({ address, category, searchedkeyword }),
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선한 상태 유지
    retry: 1, // 실패 시 재시도 횟수
  });

  // data를 별도의 객체로 반환
  return { data, isPending, isError };
};


export default useGetPostsbyFilter;