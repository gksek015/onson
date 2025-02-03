'use client';

import MyProfile from '@/app/(auth)/my-page/_components/MyProfile';
import QuickMyBookmarks from '@/app/(auth)/my-page/_components/QuickMyBookmarks';
import QuickMyPosts from '@/app/(auth)/my-page/_components/QuickMyPosts';
import { ModalSheet } from '@/components/common/ModalSheet';
import { RightArrowForChatIcon } from '@/components/icons/Icons';
import useIsMobile from '@/hooks/ui/useIsMobile';
import logoutWithUser from '@/lib/auth/clientAuth';
import { useDialogStore } from '@/utils/store/useDialogStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileUpdate from './ProfileUpdate';

const UserInfo = () => {
  const router = useRouter();
  //브라우저 좌우 사이즈 상태 및 변경
  const isMobile = useIsMobile();
  const { open } = useDialogStore();

  return (
    <>
      <div
        onClick={isMobile ? () => router.push('/my-page/my-profile') : () => open('profileModal')}
        className="cursor-pointer desktop:px-[60px]"
      >
        <MyProfile />
      </div>
      <div className="my_profile_blank"></div>
      <Link className="my_profile_titlebtn_wrapper" href="/my-page/bookmarks">
        <span>관심있는 봉사</span>
        <RightArrowForChatIcon />
      </Link>
      <QuickMyBookmarks />
      <div className="my_profile_blank"></div>
      <Link className="my_profile_titlebtn_wrapper" href="/my-page/my-posts">
        <span>나의 봉사요청</span>
        <RightArrowForChatIcon />
      </Link>
      <QuickMyPosts />
      <div className="my_profile_blank"></div>
      {isMobile && (
        <div
          className="flex w-full cursor-pointer items-center justify-center px-[20px] py-[28px] text-[#E4290C] focus:outline-none"
          onClick={logoutWithUser}
        >
          로그아웃
        </div>
      )}

      {/* BottomSheet */}
      <ModalSheet id="profileModal">
        {/* 전달되는 Content 컴포넌트 */}
        <h1 className="absolute left-1/2 top-[16px] -translate-x-1/2 text-[20px] font-bold">프로필 수정</h1>
        <ProfileUpdate />
      </ModalSheet>
    </>
  );
};

export default UserInfo;
