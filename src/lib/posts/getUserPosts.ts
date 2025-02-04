import { PostType } from '@/types/PostType';
import { supabase } from '@/utils/supabase/client';

// 사용자 ID를 기반으로 참여한 게시글 목록 조회
export const getUserPosts = async (userId: string, limit?: number): Promise<PostType[]> => {
  if (!userId) {
    throw new Error('유저 ID가 없습니다.');
  }

  // 유저가 참여한 게시글 ID 조회
  const { data: postData, error: postError } = await supabase
    .from('participant')
    .select('post_id')
    .eq('user_id', userId)
    .eq('is_checked', true);

  if (postError) {
    console.error('참가한 게시글 조회 오류:', postError);
    throw new Error('Failed to fetch participant posts');
  }

  if (!postData || postData.length === 0) {
    console.log('참가한 게시글이 없습니다.');
    return [];
  }

  // post_id 목록 배열 생성
  const postIds = postData.map((item) => item.post_id);

  // 최신순으로 게시글 상세 정보 조회
  let query = supabase
    .from('posts')
    .select('*, users(nickname, profile_img_url), images(img_url)')
    .in('id', postIds)
    .order('created_at', { ascending: false });

  // limit이 존재하면 적용
  if (limit) {
    query = query.limit(limit);
  }

  const { data: posts, error: postsError } = await query;

  if (postsError) {
    console.error('게시글 정보 조회 오류:', postsError);
    throw new Error('Failed to fetch posts');
  }

  return posts;
};
