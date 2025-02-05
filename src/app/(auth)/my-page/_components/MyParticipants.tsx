'use client';

import VolunteerCard from '@/app/(home)/VolunteerCard';
import useUserPosts from '@/hooks/useUserPosts';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore';
import { usePathname } from 'next/navigation';

const MyParticipants = () => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const nicknameStore = useNicknameStore();

  let userId: string = '';

  if (pathname.startsWith('/my-page')) {
    userId = userStore.user?.id || '';
  }

  if (pathname.startsWith('/user-page')) {
    userId = nicknameStore.user?.id || '';
  }

  const { data: posts, isPending, isError } = useUserPosts(userId);
  if (isPending) {
    return <p>참여한 봉사를 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p>참여한 봉사 데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className="my_profile_no_contents">참여한 봉사가 없습니다.</p>;
  }
  return (
    <ul className="grid grid-cols-1 gap-[1px] desktop:mt-[30px] desktop:grid-cols-3 desktop:gap-4">
      {posts.map((post) => (
        <VolunteerCard key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default MyParticipants;
