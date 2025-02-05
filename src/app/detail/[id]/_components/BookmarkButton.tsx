'use client';

import { BookmarkBlackIcon, BookmarkColorIcon } from '@/components/icons/Icons';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useDialogStore } from '@/utils/store/useDialogStore';
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
  const { open } = useDialogStore();

  const isBookmarked = isLoggedIn() ? bookmarks?.some((bookmark) => bookmark.post_id === postId) : false;

  const handleBookmark = () => {
    if (!user) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '북마크 기능을 사용하려면 로그인이 필요합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하기',
        confirmButtonColor: 'var(--primary-3)',
        cancelButtonText: '취소',
        cancelButtonColor: '#B4B4B4'
      }).then((result) => {
        if (result.isConfirmed) {
          if (window.innerWidth < 768) {
            router.push('/login');
          } else {
            open('loginModal');
          }
        } else if (result.isDismissed) {
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
