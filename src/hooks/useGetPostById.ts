import { deletePost } from '@/lib/posts/deletePostbyID';
import { updateCompleted } from '@/lib/posts/updatePost';
import { getPost } from "@/lib/posts/updatePost";
import { PostType } from "@/types/PostType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPostById = (postId: string) => {
  const queryClient = useQueryClient();

  // 포스트 가져오기
  const { data, isPending, isError } = useQuery<PostType | null>({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    enabled: !!postId, // id가 존재할 때만 실행
  });


  const deletePostById = useMutation({
        mutationFn: (postId: string) => deletePost(postId),
        onMutate: async (postId) => {
          await queryClient.cancelQueries({
            queryKey: ["post", postId],
          })

          const previousPost = queryClient.getQueryData<PostType>(["post", postId])

        queryClient.setQueryData<PostType | null>(['post', postId], null);

        return { previousPost };
        },
        onError: (context : {previousPost : PostType}) => {
          queryClient.setQueryData( ["post", postId], context.previousPost)
        },
        onSettled: (postId) => {
          queryClient.invalidateQueries({
            queryKey:  ["post", postId],
          })
        },
  })

   // completed 값 업데이트 함수
  const updateCompletedById = useMutation({
    mutationFn: (postId: string) => updateCompleted(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ["post", postId],
      });

      const previousPost = queryClient.getQueryData<PostType>(["post", postId]);

      // 캐시에서 completed 값을 바꾸기
      queryClient.setQueryData<PostType | null>(["post", postId], (prev) =>
        prev ? { ...prev, completed: !prev.completed } : null
      );

      return { previousPost };
    },
    onError: (context: { previousPost: PostType }) => {
      queryClient.setQueryData(["post", postId], context.previousPost);
    },
    onSettled: (postId) => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },
  });

  return { data, isPending, isError, deletePostById, updateCompletedById };
}




