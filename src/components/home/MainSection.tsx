'use client';

import AddressButton from '@/components/home/AddressButton';
import HeroSection from '@/components/home/HeroSection';
import useGetPostsbyFilter from '@/hooks/useGetPostsbyFilter';
import VolunteerCard from './VolunteerCard';

const MainSection = () => {
  const { data: posts, isPending } = useGetPostsbyFilter();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const recentPosts = posts?.slice(0, 8);

  return (
    <section>
      <div className="mx-4 mb-4 mt-2 flex items-center justify-center gap-3">
        <AddressButton />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="px-5 pt-7">
        <h3 className="text-sm text-[#FB657E]">New</h3>
        <h2 className="text-xl font-semibold">방금 등록된 봉사</h2>
      </div>
      {recentPosts?.map((post) => <VolunteerCard key={post.id} post={post} />)}
    </section>
  );
};

export default MainSection;
