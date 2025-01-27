'use client';

import {useGetPostById} from '@/hooks/useGetPostById';
import ImageSwiper from './ImageSwiper';
import PostContent from './PostContent';
import { Loading } from '@/components/common/Loading';

interface PostDetailProps {
  postPageId: string;
}

const PostDetail = ({ postPageId }: PostDetailProps) => {
  const { data: post, isPending, isError } = useGetPostById(postPageId);

  // TODO: 로딩중 스피너로 변경하기
  if (isPending) 
    return (
  <Loading/>
);
  if (isError || !post) return <div>에러 발생</div>;

  return (
    <div className="mx-auto max-w-2xl">
      {post.images && <ImageSwiper images={post.images} isPostClosed={post.completed} />}
      {/* 이미지 없으면 그냥 컨텐트만 보여줌 */}
      <PostContent
        title={post.title}
        nickname={post.users.nickname}
        created_at={post.date}
        content={post.content}
        postId={post.id}
        postOwnerId={post.user_id}
        category={post.category}
        startDate={post.date}
        endDate={post.end_date}
        address={{ si: post.si, gu: post.gu, dong: post.dong }}
        isPostClosed={post.completed}
        profileImgUrl = {post.users.profile_img_url}
      />
    </div>
  );
};

export default PostDetail;
