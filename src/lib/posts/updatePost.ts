import type { FormData } from "@/types/formdata";
import { createClient } from "@/utils/supabase/client";

export const getPost = async (postId: string) => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, images(img_url)`)
    .eq('id', postId)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data
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
