import { PostType } from "@/types/PostType";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/lib/posts/updatePost";

const useGetPostById = (id: string) => {
  const { data, isPending, isError } = useQuery<PostType | null>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id, // id가 존재할 때만 쿼리 실행
  });

  return { data, isPending, isError };
};

export default useGetPostById;
