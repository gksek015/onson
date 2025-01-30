import { supabase } from "@/utils/supabase/client";
import dayjs from "dayjs";

interface Param  {
    pageParam: number
    }

export const getInfinitePost = async ({ pageParam = 0 }: Param) => {
  const today = dayjs().format('YYYY-MM-DD');

  // 마감 여부를 업데이트하는 쿼리 실행
  await supabase
    .from('posts')
    .update({ completed: true })
    .lte('end_date', today) // 마감 날짜가 지난 게시글만 업데이트
    .eq('completed', false); // 아직 마감되지 않은 게시글만

    const { data: post, error } = await supabase
    .from('posts')
    .select(`*, images(img_url), users(nickname, profile_img_url)`)
    .order('created_at', { ascending: false })
    .range(pageParam * 8, (pageParam + 1) * 8 - 1)
    if (error) {
      console.error(error.message)
    }
    if (!post) {
      return
    }
    
    
    const totalPage = post.length || 0
    const nextCursor = totalPage === 8 ? pageParam + 1 : undefined
    const prevCursor = pageParam > 0 ? pageParam - 1 : undefined
    return {
      post,
      nextCursor,
      prevCursor,
    }
  }


