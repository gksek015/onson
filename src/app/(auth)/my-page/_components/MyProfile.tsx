'use client';

import { RightArrowForChatIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';

const MyProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-center justify-between border-b-[12px] border-[#F4F5F5] px-4 py-6">
      <div className="h-[52px] w-[52px] rounded-full bg-[#ECEDEE]"></div>

      <div className="ml-4 flex flex-col">
        <span className="text-lg font-bold">{user?.nickname || '사용자 이름'}</span>
        <span className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">프로필 수정</span>
      </div>

      <div className="ml-auto">
        <RightArrowForChatIcon />
      </div>
    </div>
  );
};

export default MyProfile;
