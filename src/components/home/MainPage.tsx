'use client';

import CategoryBar from '@/components/home/CategoryBar';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';
import { getPosts } from '@/lib/posts/getPosts';
import type { PostType } from '@/types/PostType';
import { useEffect, useState } from 'react';
import VolunteerCard from './VolunteerCard';

export default function MainPage() {
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

  if (loading) {
    return <div className="py-5 text-center">Loading...</div>;
  }

  return (
    <section>
      <div className="mx-4 flex items-center justify-center gap-3">
        <CategoryBar />
        <SearchBar />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="py-4">
        <h2 className="px-5 text-xl font-semibold">방금 등록된 봉사</h2>
        <div className="grid grid-cols-1 gap-4 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <VolunteerCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
