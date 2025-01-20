import { getPosts } from '@/lib/posts/getPosts';
import { PostType } from '@/types/PostType';
import { useQuery } from '@tanstack/react-query';


const useGetPost = (userId?: string) => {
  const { data: posts, isPending, isError } = useQuery<PostType[]>({
    queryKey: ['posts', userId], // queryKey에 필터링 조건 포함
    queryFn: () => getPosts({userId}), // getPosts에 옵션 전달
  });

  return { posts, isPending, isError };
};

export default useGetPost;
