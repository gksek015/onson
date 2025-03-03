import type { Metadata } from 'next';

import SetPageTitle from '@/app/(auth)/_components/SetPageTitle';
import MyBookmarks from '@/app/(auth)/my-page/_components/MyBookmarks';

export const metadata: Metadata = {
  title: 'ON:SON 마이페이지',
  description: 'ON:SON의 나의 북마크 페이지입니다. 사용자의 북마크 정보를 확인 할 수 있습니다.'
};
const BookmarksPage = () => {
  return (
    <div className="mx-auto w-full desktop:w-[1280px]">
      <SetPageTitle title="관심있는 봉사" />
      <MyBookmarks />
    </div>
  );
};
export default BookmarksPage;
