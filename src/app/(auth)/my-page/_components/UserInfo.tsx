'use client';

import VolunteerCardNoImg from '@/components/home/VolunteerCardNoImg';
import useGetPost from '@/hooks/useGetPost';
import { useUserStore } from '@/utils/store/userStore';
import Link from 'next/link';

const UserInfo = () => {
  const user = useUserStore((state) => state.user);

  // userId를 직접 전달
  const { posts, isPending, isError } = useGetPost(user?.id || '');

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
    return <p>내가 쓴 글이 없습니다.</p>;
  }

  return (
    <div>
      <Link href="/my-page/bookmarks">내 북마크 보기</Link>
      <Link href="/my-page/my-posts">나의 봉사요청 보기</Link>
      <div className="w-full space-y-4 border-b border-t border-[#e7e7e7]">
        <div className="flex flex-row gap-4 overflow-x-auto">
          {posts.map((post) => (
            <VolunteerCardNoImg key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
