import type { Metadata } from 'next';
import SetPageTitle from '../../_components/SetPageTitle';
import ProfileUpdate from '../_components/ProfileUpdate';

export const metadata: Metadata = {
  title: '나의 봉사요청 페이지',
  description: '사용자가 요청한 봉사활동을 확인할 수 있는 페이지입니다.'
};

const page = () => {
  return (
    <div className="auth_page_wrapper">
      <SetPageTitle title="프로필 수정" />
      <ProfileUpdate />
    </div>
  );
};

export default page;
