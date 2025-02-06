'use client';

import { RecommendedPost } from '@/types/RecommendedPost';
import { useRouter } from 'next/navigation';

const RecommendationList = ({ posts }: { posts: RecommendedPost[] }) => {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/detail/${id}`);
  };
  return (
    <div className="mt-4 space-y-4">
      <div className="text-lg font-semibold">추천된 봉사 게시글</div>
      <div className="text-sm font-normal">입력해주신 정보를 바탕으로 관련성 높은 게시글들을 온손이가 찾아봤어요!</div>
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg border bg-white p-4 shadow-md">
          <div className="text-md font-bold text-gray-900">{post.title}</div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">기간:</span> {post.date} ~ {post.end_date}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">위치:</span> {post.location}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">카테고리:</span> {post.category}
          </p>
          <button
            onClick={() => handleNavigate(post.id)}
            className="mt-2 w-full rounded-lg bg-[#FB657E] px-4 py-2 text-center font-medium text-white hover:bg-red-500"
          >
            게시글 상세 보기
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;
