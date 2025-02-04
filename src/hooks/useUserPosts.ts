import { getUserPosts } from '@/lib/posts/getUserPosts';
import { useQuery } from '@tanstack/react-query';

const useUserPosts = (userId?: string, limit?: number) => {
  return useQuery({
    queryKey: ['userPosts', userId, limit], 
    queryFn: () => {
      if (!userId) throw new Error('유저 ID가 없습니다.');
      return getUserPosts(userId, limit);
    },
    enabled: !!userId, 
  });
};

export default useUserPosts;
