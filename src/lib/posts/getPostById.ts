import { PostType } from "@/types/PostType";
import { createClient } from "@/utils/supabase/client";

// postId 받으면 인자로 받으면 해당 데이터 가져오는 함수
const getPostById = async (id: string): Promise<PostType | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users(nickname), images(img_url)`)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("post by ID 패칭 실패");
  }

  return data as PostType;
};

export default getPostById;