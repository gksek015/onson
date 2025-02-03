import type { PostType } from '@/types/PostType';
import { supabase } from '@/utils/supabase/client';
import dayjs from 'dayjs';

interface GetPostsParams {
  address?: string;
  category?: string;
  searchedkeyword?: string;
}

export const getPostbyFilter = async ({ address, category, searchedkeyword }: GetPostsParams): Promise<PostType[]> => {
  let query = supabase
    .from('posts')
    .select(`*, images(img_url), users(nickname, profile_img_url)`);

  // "마감" 검색 시 end_date 필터링 추가
  if (searchedkeyword?.includes('마감')) {
    const today = dayjs().format('YYYY-MM-DD');
    const twoDaysLater = dayjs().add(3, 'day').format('YYYY-MM-DD');

    query = query
      .gte('end_date', today) // 마감일이 지나지 않은 게시글
      .lte('end_date', twoDaysLater) // 마감일까지 2일 이하 남은 게시글
      .eq('completed', false); // 모집 완료되지 않은 게시글만 가져오기
  } else {
    // 기존 검색어 필터
    if (searchedkeyword) {
      query = query.or(
        `si.ilike.%${searchedkeyword}%,gu.ilike.%${searchedkeyword}%,dong.ilike.%${searchedkeyword}%,title.ilike.%${searchedkeyword}%,content.ilike.%${searchedkeyword}%,category.ilike.%${searchedkeyword}%`
      );
    }
  }

  // 주소 필터 추가
  if (address) {
    const addressList = address.split('_');
    if (addressList.length === 3) {
      query = query
        .ilike('si', addressList[0])
        .ilike('gu', addressList[1])
        .ilike('dong', addressList[2]);
    } else if (addressList.length === 2) {
      query = query
        .ilike('si', addressList[0])
        .ilike('gu', addressList[1]);
    }
  }

  // 카테고리 필터 추가
  if (category) {
    query = query.eq('category', category);
  }

  // 전체 게시물 최신순 정렬
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  console.log('data', data)

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('게시물 데이터를 가져오는 데 실패했습니다.');
  }

  return data as PostType[];
};
