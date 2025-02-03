import { supabase } from "@/utils/supabase/client";

// postId를 받아 해당 게시물을 삭제하는 함수
export const deletePost = async (postId: string): Promise<boolean> => {
  console.log('??',postId)
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('포스트 삭제 실패함:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('삭제하다가 에러남:', error);
    return false;
  }
};