import { PostType } from "@/types/PostType";
import { createClient } from "@/utils/supabase/client";


const getPostById = async (id: string): Promise<PostType | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users(nickname), images(img_url)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Failed to fetch post");
  }

  return data as PostType;
};

export default getPostById;