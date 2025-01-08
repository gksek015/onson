import CategoryBar from '@/components/home/CategoryBar';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';
import VolunteerCard from '@/components/home/VolunteerCard';
import ChatBoxButton from '@/components/chatbox/ChatBoxButton';

const volunteers = Array(8).fill(null);

export default function Home() {
  return (
    <section>
      <div className="flex justify-center items-center gap-3 mx-4">
        <CategoryBar />
        <SearchBar />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="py-4">
        <h2 className="px-5 text-xl font-semibold">방금 등록된 봉사</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-5 pb-20">
          {volunteers.map((_, index) => (
            <VolunteerCard key={index} />
          ))}
        </div>
      </div>
      <div>
        <ChatBoxButton></ChatBoxButton>
      </div>
    </section>
  );
}
