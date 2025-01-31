import { useQuery } from '@tanstack/react-query';
import { getUrgentPosts } from '@/lib/posts/getUrgentPosts';
import type { PostType } from '@/types/PostType';

const useGetUrgentPosts = () => {
  return useQuery<PostType[]>({
    queryKey: ['urgentPosts'], // 캐싱을 위한 queryKey
    queryFn: getUrgentPosts, // API 호출 (파라미터 없음)
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    retry: 1, // 실패 시 한 번만 재시도
  });
};

export default useGetUrgentPosts;
