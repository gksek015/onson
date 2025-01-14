import { supabase } from '@/utils/supabase/client';
import type { PostType } from '@/types/PostType';

export const getPostbyAddress = async (address?: string): Promise<PostType[]> => {
  let query = supabase.from('posts').select(`*, images(img_url)`);

  if (address) {
    // address가 존재하면 필터링
    const addressList = address.split('_');
    if (addressList.length === 3) {
      query = query
        .ilike('si', addressList[0]) // si 일치 조건
        .ilike('gu', addressList[1]) // gu 일치 조건
        .ilike('dong', addressList[2]); // dong 일치 조건
    }
  } else {
    // 전체 게시물 최신순 정렬
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('게시물 데이터를 가져오는 데 실패했습니다.');
  }

  return data || [];
};
