import type { PostType } from '@/types/PostType';
import { supabase } from '@/utils/supabase/client';
import dayjs from 'dayjs';

export const getUrgentPosts = async (): Promise<PostType[]> => {
  const today = dayjs().format('YYYY-MM-DD');
  const threeDaysLater = dayjs().add(3, 'day').format('YYYY-MM-DD'); // 현재 날짜 + 3일

  const { data, error } = await supabase
    .from('posts')
    .select(`*, images(img_url), users(nickname, profile_img_url)`)
    .gte('end_date', today) // 마감일이 오늘 이후인 게시글
    .lte('end_date', threeDaysLater) // 마감일이 3일 이내인 게시글
    .eq('completed', false) // 모집 완료되지 않은 게시글만 가져옴
    .order('end_date', { ascending: true }) // 마감일이 빠른 순으로 정렬
    .limit(9); // 최대 9개까지만 가져옴

  if (error) {
    console.error('Error fetching urgent posts:', error);
    throw new Error('마감 임박 게시글을 가져오는 데 실패했습니다.');
  }

  return data as PostType[];
};
