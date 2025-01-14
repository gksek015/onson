import SearchBar from '@/components/home/SearchBar';
import Header from '@/components/layout/Header';
import AllLists from './_components/AllLists';

const ListPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-5 mb-20 flex flex-col items-center justify-center gap-3">
        <SearchBar />
        <AllLists />
      </div>
    </div>
  );
};
export default ListPage;
