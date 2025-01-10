import { PostType } from '@/types/PostType';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../lib/posts/getPosts';


const useGetPost = () => {
  const { data, isPending, isError } = useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  return { data, isPending, isError };
};

export default useGetPost;

