'use client';

import VolunteerCardNoImg from '@/app/(auth)/my-page/_components/VolunteerCardNoImg';
import useGetPost from '@/hooks/useGetPost';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore';
import { usePathname } from 'next/navigation';

const QuickMyPosts = () => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const nicknameStore = useNicknameStore();

  let userId;

  if (pathname.startsWith('/my-page')) {
    userId = userStore.user?.id;
  } else if (pathname.startsWith('/user-page')) {
    userId = nicknameStore.user.id ?? '';
  }

  const { posts, isPending, isError } = useGetPost(userId, 3);

  if (isPending) {
    return <p>내가 쓴 글을 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p>내가 쓴 글 데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className="my_profile_no_contents">내가 쓴 글이 없습니다.</p>;
  }

  return (
    <div className="flex w-full flex-row overflow-x-auto desktop:overflow-x-hidden desktop:px-[60px]">
      {posts.map((post, index) => (
        <VolunteerCardNoImg
          key={post.id}
          post={post}
          isLast={index === posts.length - 1} // 마지막 카드인지 확인
        />
      ))}
    </div>
  );
};

export default QuickMyPosts;
