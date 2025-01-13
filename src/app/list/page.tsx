import SearchBar from '@/components/home/SearchBar';
import AllLists from './_components/AllLists';

const ListPage = () => {
  return (
    <div className="mx-4 flex flex-col items-center justify-center gap-3">
      <SearchBar />
      <AllLists />
    </div>
  );
};
export default ListPage;
