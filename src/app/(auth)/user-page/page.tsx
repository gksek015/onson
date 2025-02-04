import type { Metadata } from 'next';

import SetPageTitle from '@/app/(auth)/_components/SetPageTitle';
import UserInfo from '@app/(auth)/my-page/_components/UserInfo';

export const metadata: Metadata = {
  title: 'ON:SON 다른 사용자 이력 페이지',
  description: 'ON:SON의 다른 사용자의 참여 봉사와 봉사요청 사항을 확인 할 수 있습니다.'
};

const page = () => {
  return (
    <div className="auth_page_wrapper">
      <SetPageTitle title="마이 페이지" />
      <UserInfo />
    </div>
  );
};

export default page;
