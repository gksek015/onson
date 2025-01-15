import { createClient } from "@/utils/supabase/client";

// 북마크 가져오기
export const getBookmarks = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookmark")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
  return data;
};

// 북마크 추가
export const addBookmark = async (userId: string, postId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("bookmark")
    .insert([{ user_id: userId, post_id: postId }]);

  if (error) {
    throw error;
  }
};

// 북마크 삭제
export const removeBookmark = async (userId: string, postId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("bookmark")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) {
    throw error;
  }
};
