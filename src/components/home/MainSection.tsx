'use client';

import useGetPostMain from '@/app/hooks/useGetPostMain';
import CategoryButton from '@/components/home/CategoryButton';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';
import VolunteerCard from './VolunteerCard';

const MainSection = () => {
  const { posts, loading } = useGetPostMain();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="mx-4 flex items-center justify-center gap-3">
        <CategoryButton />
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
};

export default MainSection;
