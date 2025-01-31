import AddressTags from '@/app/list/_components/AddressTags';
import CategoryButton from '@/app/list/_components/CategoryButton';
import Tags from '@/app/list/_components/Tags';
import BottomNav from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';
import { categories } from '@/constants/categories';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import AllLists from './_components/AllLists';
import SearchBar from './_components/SearchBar';
import UpScrollButton from './_components/UpScrollButton';

export const metadata: Metadata = {
  title: 'ON:SON',
  description: 'ON:SON에서 모집 중인 봉사활동 게시글입니다. 내가 원하는 봉사활동을 검색해 보세요'
};

const ListPage = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto mb-20 flex max-w-content flex-col pt-2">
        <Suspense>
          <div className="mx-auto flex w-full flex-col items-start gap-3 self-stretch px-5 desktop:w-[760px]">
            <div className="flex w-full gap-3">
              <SearchBar />
              <CategoryButton categories={categories} />
            </div>
            <div className="flex gap-3">
              <AddressTags />
              <Tags />
            </div>
          </div>
          <AllLists />
        </Suspense>
      </div>
      <div className="block mobile:hidden">
        <BottomNav />
      </div>
      <UpScrollButton />
    </div>
  );
};
export default ListPage;
