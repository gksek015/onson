import { addBookmark, getBookmarks, removeBookmark } from "@/lib/bookmarks/getBookmarkStatus";
import { bookmark } from "@/types/BookmarkType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBookmarks = (userId: string) => {
  const queryClient = useQueryClient();

  // 북마크 가져오기
  const { data: bookmarks, isPending, isError } = useQuery<bookmark[]>({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarks(userId),
    enabled: !!userId, // userId가 있을 때만 실행
  });

  // 북마크 추가
  const addBookmarkMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) => addBookmark(userId, postId),
    onMutate: async ({ postId }) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({queryKey: ["bookmarks", userId]});
      const previousBookmarks = queryClient.getQueryData<bookmark[]>(["bookmarks", userId]);
      queryClient.setQueryData<bookmark[]>(["bookmarks", userId], (prev) => [
        ...(prev || []),
        { post_id: postId, user_id: userId, id: "", created_at: "" }, // 임시 데이터
      ]);
      return { previousBookmarks };
    },
    onError: (context: { previousBookmarks: bookmark[] } ) => {
      // 에러 발생 시 롤백
      queryClient.setQueryData(["bookmarks", userId], context.previousBookmarks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["bookmarks", userId]});
    },
  });

  // 북마크 삭제
  const removeBookmarkMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) => removeBookmark(userId, postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({queryKey: ["bookmarks", userId]});
      const previousBookmarks = queryClient.getQueryData<bookmark[]>(["bookmarks", userId]);
      queryClient.setQueryData<bookmark[]>(["bookmarks", userId], (prev) =>
        (prev || []).filter((bookmark) => bookmark.post_id !== postId)
      );
      return { previousBookmarks };
    },
    onError: (context: { previousBookmarks: bookmark[] }) => {
      queryClient.setQueryData(["bookmarks", userId], context.previousBookmarks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["bookmarks", userId]});
    },
  });

  return {
    bookmarks,
    isPending,
    isError,
    addBookmark: addBookmarkMutation.mutate,
    removeBookmark: removeBookmarkMutation.mutate,
  };
};
