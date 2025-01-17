'use client';

import { BookmarkBlackIcon, BookmarkColorIcon } from '@/components/icons/Icons';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface BookmarkButtonProps {
  postId: string;
}

const BookmarkButton = ({ postId }: BookmarkButtonProps) => {
  const { user, isLoggedIn } = useUserStore();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks(user?.id || '');
  const router = useRouter();

  const isBookmarked = isLoggedIn() ? bookmarks?.some((bookmark) => bookmark.post_id === postId) : false;

  const handleBookmark = () => {
    if (!user) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '북마크 기능을 사용하려면 로그인이 필요합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하러 가기',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return;
    }

    if (isBookmarked) {
      removeBookmark({ userId: user.id, postId });
    } else {
      addBookmark({ userId: user.id, postId });
    }
  };

  return (
    <div className="flex cursor-pointer" onClick={handleBookmark}>
      {isBookmarked ? <BookmarkColorIcon /> : <BookmarkBlackIcon />}
    </div>
  );
};

export default BookmarkButton;
