import type { Metadata } from 'next';

import UserInfo from '@app/(auth)/my-page/_components/UserInfo';

export const metadata: Metadata = {
  title: 'ON:SON 마이페이지',
  description: 'ON:SON의 마이페이지입니다. 사용자의 정보 수정이 가능합니다.'
};

const MyPage = () => {
  return (
    <div>
      <h1>마이 페이지</h1>
      <UserInfo />
    </div>
  );
};

export default MyPage;
