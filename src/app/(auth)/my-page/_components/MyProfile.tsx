'use client';

import { RightArrowForChatIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';

const MyProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="my_profile_wrapper flex items-center justify-between pb-[20px]">
      <div className="h-[52px] w-[52px] rounded-full bg-[#ECEDEE]"></div>

      <div className="ml-4 flex flex-col">
        <span className="text-lg font-bold text-[#242628]">{user?.nickname || '사용자 이름'}</span>
        <span className="cursor-pointer text-sm text-[#868C92]">프로필 수정</span>
      </div>

      <div className="ml-auto">
        <RightArrowForChatIcon />
      </div>
    </div>
  );
};

export default MyProfile;
