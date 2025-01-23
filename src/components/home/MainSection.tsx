'use client';

import AddressButton from '@/components/home/AddressButton';
import HeroSection from '@/components/home/HeroSection';
import useGetPostsbyFilter from '@/hooks/useGetPostsbyFilter';
import VolunteerCard from './VolunteerCard';
import { Loading } from '@/components/common/Loading';

const MainSection = () => {
  const { data: posts, isPending } = useGetPostsbyFilter();

  if (isPending) {
    return <Loading/>;
  }

  const recentPosts = posts?.slice(0, 9);

  return (
    <>
      <div className="mx-4 mb-4 mt-2 flex items-center justify-center gap-3">
        <AddressButton />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="px-5 pt-7 tracking-[-0.4px]">
        <h2 className="text-sm text-[#FB657E]">New</h2>
        <h1 className="text-xl font-semibold">방금 등록된 봉사</h1>
      </div>
      {recentPosts?.map((post) => <VolunteerCard key={post.id} post={post} />)}
    </>
  );
};

export default MainSection;
