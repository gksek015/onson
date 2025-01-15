import { Database } from "./supabase";

// Bookmark 타입 
export type bookmark = Database["public"]["Tables"]["bookmark"]["Row"];