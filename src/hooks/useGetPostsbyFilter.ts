import { getPostbyFilter } from '@/lib/posts/getPostbyFilter';
import type { PostType } from '@/types/PostType';
import { useQuery } from '@tanstack/react-query';

const useGetPostsbyFilter = (address?: string, category? : string) => {
  const {data, isPending, isError} = useQuery<PostType[]>({
    queryKey: ['posts', address, category], // 쿼리 키
    queryFn: () => getPostbyFilter({address, category}), // Supabase 데이터 가져오기
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선한 상태 유지
    retry: 1, // 실패 시 재시도 횟수
  });

  return { data, isPending, isError };
};


export default useGetPostsbyFilter;