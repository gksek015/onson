import { getPosts } from "@/lib/posts/getPosts";
import type { PostType } from "@/types/PostType";
import { useEffect, useState } from "react";

const useGetPostMain = ()=>{
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const fetchedPosts = await getPosts();
          // 최신 게시글 8개만 가져오기
          setPosts(fetchedPosts.slice(0, 8));
        } catch (error) {
          console.error('데이터를 불러오는데 실패했습니다.', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, []);

    return { posts, loading };
}

export default useGetPostMain