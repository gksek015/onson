import CategoryBar from '@/components/home/CategoryBar';
import SearchBar from '@/components/home/SearchBar';
import VolunteerCard from '@/components/home/VolunteerCard';

export default function Home() {
  return (
    <main className=''>
      <div className="flex justify-center items-center gap-3 mx-4">
        <CategoryBar />
        <SearchBar />
      </div>
      <div className="py-4">
        <div className="px-5 space-y-4">
        <h2 className="px-5 text-xl font-semibold">NEW</h2>
          <VolunteerCard />
          <VolunteerCard />
          <VolunteerCard />
        </div>
      </div>
    </main>
  );
}
