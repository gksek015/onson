import type { Metadata } from 'next';

import SetPageTitle from '@/app/(auth)/_components/SetPageTitle';
import MyParticipants from '@/app/(auth)/my-page/_components/MyParticipants';

export const metadata: Metadata = {
  title: 'ON:SON 나의 봉사참여 페이지',
  description: 'ON:SON의 사용자가 참여한 봉사활동을 확인할 수 있는 페이지입니다.'
};

const MyPaticipantsPage = () => {
  return (
    <div className="mx-auto w-full desktop:w-[1280px]">
      <SetPageTitle title="나의 참여봉사" />
      <MyParticipants />
    </div>
  );
};

export default MyPaticipantsPage;
