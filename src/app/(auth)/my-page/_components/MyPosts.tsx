'use client';

import VolunteerCard from '@/app/(home)/VolunteerCard';
import useGetPost from '@/hooks/useGetPost';
import { useUserStore } from '@/utils/store/userStore';

const MyPosts = () => {
  const { user } = useUserStore();

  // userId를 직접 전달
  const { posts, isPending, isError } = useGetPost(user?.id);

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
    <>
      {posts.map((post) => (
        <VolunteerCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default MyPosts;
