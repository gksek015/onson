import AddressTags from '@/app/list/_components/AddressTags';
import CategoryButton from '@/app/list/_components/CategoryButton';
import Tags from '@/app/list/_components/Tags';
import Header from '@/components/layout/Header';
import { categories } from '@/data/categories';
import { Suspense } from 'react';
import AllLists from './_components/AllLists';
import SearchBar from './_components/SearchBar';

const ListPage = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-content mb-20 mt-5 flex flex-col items-center justify-center gap-3 py-2">
        <Suspense>
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex w-full items-center justify-center gap-3 px-5">
              <SearchBar />
              <CategoryButton categories={categories} />
            </div>
            <div className="ml-5 flex gap-3">
              <AddressTags />
              <Tags />
            </div>
          </div>
          <AllLists />
        </Suspense>
      </div>
    </div>
  );
};
export default ListPage;
