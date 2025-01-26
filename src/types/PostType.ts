import { Database } from "./supabase";

// PostType 타입 
export type PostType = Database["public"]["Tables"]["posts"]["Row"] & {
  users: { 
    nickname: string;
    profile_img_url: string | null;
   };
  images: { img_url: string }[];
};

