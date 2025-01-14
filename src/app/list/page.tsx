import CategoryButton from '@/components/home/CategoryButton';
import SearchBar from '@/components/home/SearchBar';
import Tags from '@/components/home/Tags';
import Header from '@/components/layout/Header';
import AllLists from './_components/AllLists';

const ListPage = () => {
  return (
    <div>
      <Header />
      <div className="w-full mb-20 mt-5 flex flex-col items-center justify-center gap-3">
        <div className='w-full flex items-center justify-center gap-4'>
          <SearchBar />
          <CategoryButton />
        </div>
        <Tags />
        <AllLists />
      </div>
    </div>
  );
};
export default ListPage;
