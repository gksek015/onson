'use client';

import useGetPostById from '@/hooks/useGetPostById';
import ImageSwiper from './ImageSwiper';
import PostContent from './PostContent';

interface PostDetailProps {
  postPageId: string;
}

const PostDetail = ({ postPageId }: PostDetailProps) => {
  const { data: post, isPending, isError } = useGetPostById(postPageId);

  // TODO: 로딩중 스피너로 변경하기
  if (isPending) return <div>로딩중...</div>;
  if (isError || !post) return <div>에러 발생</div>;

  return (
    <div className="mx-auto max-w-2xl">
      {post.images && <ImageSwiper images={post.images} />}
      {/* 이미지 없으면 그냥 컨텐트만 보여줌 */}
      <PostContent title={post.title} nickname={post.users.nickname} date={post.date} content={post.content} />
    </div>
  );
};

export default PostDetail;
