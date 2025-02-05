import type { Metadata } from 'next';

import SetPageTitle from '@/app/(auth)/_components/SetPageTitle';
import MyPosts from '@/app/(auth)/my-page/_components/MyPosts';

export const metadata: Metadata = {
  title: 'ON:SON 다른 사용자의 봉사요청 페이지',
  description: 'ON:SON의 다른 사용자가 요청한 봉사활동을 확인할 수 있는 페이지입니다.'
};

const UserPostPage = () => {
  return (
    <div className="mx-auto w-full desktop:w-[1280px]">
      <SetPageTitle title="나의 봉사요청" />
      <MyPosts />
    </div>
  );
};

export default UserPostPage;
