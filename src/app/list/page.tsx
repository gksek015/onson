import CategoryButton from '@/app/list/_components/CategoryButton';
import Tags from '@/app/list/_components/Tags';
import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import AllLists from './_components/AllLists';
import SearchBar from './_components/SearchBar';

const ListPage = () => {
  return (
    <div>
      <Header />
      <div className="mb-20 mt-5 flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-center gap-4">
          <SearchBar />
          <CategoryButton />
        </div>
        <Suspense>
          <Tags />
          <AllLists />
        </Suspense>
      </div>
    </div>
  );
};
export default ListPage;
