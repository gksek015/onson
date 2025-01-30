'use client';

import VolunteerCardNoImg from '@/app/(home)/VolunteerCardNoImg';
import useGetPost from '@/hooks/useGetPost';
import { useUserStore } from '@/utils/store/userStore';

const QuickMyPosts = () => {
  const user = useUserStore((state) => state.user);

  // userId를 직접 전달
  const { posts, isPending, isError } = useGetPost(user?.id, 3);

  if (!user) {
    return <p>사용자 정보가 없습니다.</p>;
  }

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
    <div className="flex w-full flex-row overflow-x-auto">
      {posts.map((post) => (
        <VolunteerCardNoImg key={post.id} post={post} />
      ))}
    </div>
  );
};

export default QuickMyPosts;
