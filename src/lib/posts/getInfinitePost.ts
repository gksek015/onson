import { supabase } from "@/utils/supabase/client"

interface Param  {
    pageParam: number
    }

export const getInfinitePost = async ({ pageParam = 0 }: Param) => {
    const { data: post, error } = await supabase
    .from('posts')
    .select(`*, users(nickname), images(img_url)`)
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


