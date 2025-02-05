'use client';

import VolunteerCardNoImg from '@/app/(auth)/my-page/_components/VolunteerCardNoImg';
import { useBookmarks } from '@/hooks/useBookmarks';
import useGetPost from '@/hooks/useGetPost';
import { useUserStore } from '@/utils/store/userStore';

const QuickMyBookmarks = () => {
  const { user } = useUserStore();
  const { bookmarks, isPending: isBookmarkPending, isError: isBookmarkError } = useBookmarks(user?.id || '');
  const { posts, isPending: isPostPending, isError: isPostError } = useGetPost();

  if (isBookmarkPending || isPostPending) {
    return <p>북마크를 불러오는 중입니다...</p>;
  }

  if (isBookmarkError || isPostError) {
    return <p>북마크 데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  if (!bookmarks || bookmarks.length === 0) {
    return <p className="my_profile_no_contents">북마크된 게시물이 없습니다.</p>;
  }

  // 북마크된 게시물 필터링
  const bookmarkedPosts = posts
    ?.filter((post) => bookmarks.some((bookmark) => bookmark.post_id === post.id))
    ?.slice(0, 3); // 최신 3개의 북마크된 게시물

  if (!bookmarkedPosts || bookmarkedPosts.length === 0) {
    return <p className="my_profile_no_contents">북마크된 게시물이 없습니다.</p>;
  }

  return (
    <div className="flex w-full flex-row overflow-x-auto desktop:overflow-x-hidden desktop:px-[60px]">
      {bookmarkedPosts.map((post) => (
        <VolunteerCardNoImg key={post.id} post={post} />
      ))}
    </div>
  );
};

export default QuickMyBookmarks;
