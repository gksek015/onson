'use client';

import { MyProfileIconGray, RightArrowForChatIcon } from '@/components/icons/Icons';
import { useNicknameStore } from '@/utils/store/useNicknameStore';
import { useUserStore } from '@/utils/store/userStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserInfo {
  id: string | null;
  nickname: string | null;
  profileImage: string | null;
}

const MyProfile = () => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const nicknameStore = useNicknameStore();
  const isMyPage = pathname.startsWith('/my-page');

  // 초기값을 null로 설정하여 서버 렌더링 시 <img>를 생성하지 않도록 함
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isClient, setIsClient] = useState(false); // 클라이언트에서만 렌더링하기 위한 상태

  useEffect(() => {
    setIsClient(true); // 클라이언트 렌더링 상태 설정

    // 클라이언트에서만 유저 정보 업데이트
    if (pathname.startsWith('/my-page')) {
      setUserInfo({
        id: userStore.user?.id || null,
        nickname: userStore.user?.nickname || null,
        profileImage: userStore.user?.profileImage || null
      });
    } else if (pathname.startsWith('/user-page')) {
      setUserInfo({
        id: nicknameStore.user?.id || null,
        nickname: nicknameStore.user?.nickname || null,
        profileImage: nicknameStore.user?.profileImage || null
      });
    }
  }, [userStore.user, nicknameStore.user, pathname]);

  return (
    <div className="my_profile_wrapper flex items-center justify-between pb-[20px]">
      <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-[#ECEDEE]">
        {isClient && userInfo?.profileImage ? (
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
        <span className="text-lg font-bold text-[#242628]">
          {isClient ? userInfo?.nickname || '사용자 이름' : <span className="invisible">사용자 이름</span>}
        </span>
        {isMyPage && <span className="cursor-pointer text-sm text-[#868C92]">프로필 수정</span>}
      </div>

      <div className="ml-auto">
        <RightArrowForChatIcon />
      </div>
    </div>
  );
};

export default MyProfile;
