'use client';

import useGetPost from '@/app/hooks/useGetPost';
import AddressButton from '@/components/home/AddressButton';
import HeroSection from '@/components/home/HeroSection';
import VolunteerCard from './VolunteerCard';

const MainSection = () => {
  const { posts, isPending } = useGetPost();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const recentPosts = posts?.slice(0, 8);

  return (
    <section>
      <div className="mx-4 flex items-center justify-center gap-3">
        <AddressButton />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="py-4">
        <h2 className="px-5 text-xl font-semibold">방금 등록된 봉사</h2>
        <div className="grid grid-cols-1 gap-4 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-4">
          {recentPosts?.map((post) => <VolunteerCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
};

export default MainSection;
