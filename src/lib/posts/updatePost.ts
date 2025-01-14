import type { FormData } from "@/types/formdata";
import { PostType } from "@/types/PostType";
import { createClient } from "@/utils/supabase/client";

// postId 받으면 인자로 받으면 해당 데이터 가져오는 함수
export const getPost = async (postId: string): Promise<PostType | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, users(nickname), images(img_url)`)
    .eq('id', postId)
    .single();

  if (error) {
    throw new Error("post by ID 패칭 실패");
  }

  return data as PostType;
};

export const updatePostById = async (postId: string, updatedData: Partial<FormData>) => {
    const supabase = createClient();
  const { error } = await supabase
    .from('posts')
    .update(updatedData)
    .eq('id', postId);

  if (error) {
    console.error('Error updating post:', error);
    return false;
  }

  return true;
};

export const getCurrentUserId = async () => {
    const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user?.id;
};
