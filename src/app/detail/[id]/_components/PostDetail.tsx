'use client';

import {useGetPostById} from '@/hooks/useGetPostById';
import ImageSwiper from './ImageSwiper';
import PostContent from './PostContent';
import { Loading } from '@/components/common/Loading';
import { CheckBoxFillIcon } from '@/components/icons/Icons';

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
  if (isError || !post) return (
    <Loading/>
  );

  return (
    <div className="mx-auto max-w-[800px]">
      <div className='bg-[#feecd7] text-[#FB657E] h-[50px] flex justify-center items-center font-semibold'>모집 마감 이후 봉사자 확정 체크를 해주세요 <CheckBoxFillIcon /></div>
      {post.images && <ImageSwiper images={post.images} isPostClosed={post.completed} />}
      {/* 이미지 없으면 그냥 컨텐트만 보여줌 */}
      <PostContent
        title={post.title}
        nickname={post.users.nickname}
        content={post.content}
        postId={post.id}
        postOwnerId={post.user_id}
        category={post.category}
        startDate={post.date}
        endDate={post.end_date}
        address={{ si: post.si, gu: post.gu, dong: post.dong }}
        isPostClosed={post.completed}
        profileImgUrl = {post.users.profile_img_url}
        postPageId={postPageId}
      />
    </div>
  );
};

export default PostDetail; 
