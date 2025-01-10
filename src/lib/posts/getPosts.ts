import { PostType } from "@/types/PostType";
import { createClient } from "../../utils/supabase/client";

// posts 테이블에서 데이터 가져오는 함수
export const getPosts = async (): Promise<PostType[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('posts').select(`*, users(nickname), images(img_url)`).order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  console.log('data',data)
  return data as PostType[];
};
