import { Database } from "./supabase";

// PostType 타입 
export type PostType = Database["public"]["Tables"]["posts"]["Row"] & {
  users: { nickname: string };
  images: { img_url: string }[];
};

