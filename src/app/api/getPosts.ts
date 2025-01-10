import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// posts 테이블에서 데이터 가져오는 함수
export interface PostType {
    address: string;
    category: string;
    completed: boolean;
    content: string;
    created_at: string;
    date: string;
    id: string;
    title: string;
    user_id: string;
    users : {nickname: string}
    images: {img_url: string}[]
}

export const getPosts = async (): Promise<PostType[]> => {
  const { data, error } = await supabase.from('posts').select(`*, users(nickname), images(img_url)`).order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  console.log('data',data)
  return data as PostType[];
};
