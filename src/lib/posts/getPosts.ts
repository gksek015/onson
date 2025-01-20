import { PostType } from "@/types/PostType";
import { createClient } from "../../utils/supabase/client";

type GetPostsOptions = {
  userId?: string; // 특정 사용자 ID로 필터링
};

export const getPosts = async (options?: GetPostsOptions): Promise<PostType[]> => {
  const supabase = createClient();
  
  let query = supabase
    .from('posts')
    .select(`*, users(nickname), images(img_url)`)
    .order('created_at', { ascending: false });

  // 조건적으로 필터 추가
  if (options?.userId) {
    query = query.eq('user_id', options.userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  return data as PostType[];
};
