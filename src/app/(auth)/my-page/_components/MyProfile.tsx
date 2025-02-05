'use client';

import { MyProfileIconGray, RightArrowForChatIcon } from '@/components/icons/Icons';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MyProfile = () => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const nicknameStore = useNicknameStore();
  const isMyPage = pathname.startsWith('/my-page');

  let userInfo;

  if (pathname.startsWith('/my-page')) {
    userInfo = userStore.user;
  } else if (pathname.startsWith('/user-page')) {
    userInfo = nicknameStore.user;
  }

  return (
    <div className="my_profile_wrapper flex items-center justify-between pb-[20px]">
      <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-[#ECEDEE]">
        {userInfo?.profileImage ? (
          <Image
            src={userInfo.profileImage}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
            width={52}
            height={52}
          />
        ) : (
          <div className="pl-[5px]">
            <MyProfileIconGray />
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-col">
        <span className="text-lg font-bold text-[#242628]">{userInfo?.nickname || '사용자 이름'}</span>
        {isMyPage && <span className="cursor-pointer text-sm text-[#868C92]">프로필 수정</span>}
      </div>

      <div className="ml-auto">
        <RightArrowForChatIcon />
      </div>
    </div>
  );
};

export default MyProfile;
