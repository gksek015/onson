'use client';

import useUserPosts from '@/hooks/useUserPosts';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore';
import VolunteerCardNoImg from '@app/(auth)/my-page/_components/VolunteerCardNoImg';
import { usePathname } from 'next/navigation';

const QuickParticipants = () => {
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

  const { data: posts, isPending, isError } = useUserPosts(userId, 3);

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
    <div className="flex w-full flex-row overflow-x-auto desktop:overflow-x-hidden desktop:px-[60px]">
      {posts.map((post, index) => (
        <VolunteerCardNoImg key={post.id} post={post} isLast={index === posts.length - 1} />
      ))}
    </div>
  );
};

export default QuickParticipants;
