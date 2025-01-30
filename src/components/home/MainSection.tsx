'use client';

import { Loading } from '@/components/common/Loading';
import AddressButton from '@/components/home/AddressButton';
import HeroSection from '@/components/home/HeroSection';
import useGetUrgentPosts from '@/hooks/useUrgentPosts';
import VolunteerCard from './VolunteerCard';

const MainSection = () => {
  const { data: urgentPosts, isLoading } = useGetUrgentPosts();

  return (
    <>
      <div className="mx-4 mb-4 mt-2 flex items-center justify-center gap-3">
        <AddressButton />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="mx-auto w-full md:w-[1125px]">
        <div className="px-5 pt-7 tracking-[-0.4px]">
          <h2 className="text-sm text-[#FB657E]">HOT</h2>
          <h1 className="text-xl font-semibold">곧 마감되는 봉사</h1>
        </div>
        {isLoading && <Loading />} {/* 데이터 로딩 중일 때 */}
        {/* 마감 임박 봉사 리스트 최대 9개 표시 */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {urgentPosts?.map((post) => <VolunteerCard key={post.id} post={post} />)}
        </ul>
      </div>
    </>
  );
};

export default MainSection;
