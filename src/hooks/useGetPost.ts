import { PostType } from '@/types/PostType';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../lib/posts/getPosts';

const useGetPost = () => {
  const { data : posts, isPending, isError } = useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  return { posts, isPending, isError };
};

export default useGetPost;
