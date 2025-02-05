'use client';

import VolunteerCard from '@/app/(home)/VolunteerCard';
import useGetPost from '@/hooks/useGetPost';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore';
import { usePathname } from 'next/navigation';

const MyPosts = () => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const nicknameStore = useNicknameStore();

  let userId: string | undefined;

  if (pathname.startsWith('/my-page')) {
    userId = userStore.user?.id;
  } else if (pathname.startsWith('/user-page')) {
    userId = nicknameStore.user?.id ?? '';
  }

  const { posts, isPending, isError } = useGetPost(userId);

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
    <ul className="grid grid-cols-1 gap-[1px] desktop:mt-[30px] desktop:grid-cols-3 desktop:gap-4">
      {posts.map((post) => (
        <VolunteerCard key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default MyPosts;
