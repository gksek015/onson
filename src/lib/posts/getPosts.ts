import { PostType } from "@/types/PostType";
import { createClient } from "../../utils/supabase/client";

export const getPosts = async (userId?: string, limit?: number): Promise<PostType[]> => {
  const supabase = createClient();
  
  let query = supabase
    .from('posts')
    .select(`*, users(nickname), images(img_url)`)
    .order('created_at', { ascending: false });

  // 특정 사용자 ID로 필터링
  if (userId) {
    query = query.eq('user_id', userId);
  }

  // 게시물 개수 제한
  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  return data as PostType[];
};
