'use client';

import { CameraIcon, RightArrowForChatIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';
import Image from 'next/image';

const MyProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="my_profile_wrapper flex items-center justify-between pb-[20px]">
      <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-[#ECEDEE]">
        {user?.profileImage ? (
          <Image
            src={user.profileImage}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
            width={52}
            height={52}
          />
        ) : (
          <CameraIcon color="#D1D4D6" width="26" height="26" />
        )}
      </div>

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
