'use client';

import MyProfile from '@/app/(auth)/my-page/_components/MyProfile';
import QuickMyBookmarks from '@/app/(auth)/my-page/_components/QuickMyBookmarks';
import QuickMyPosts from '@/app/(auth)/my-page/_components/QuickMyPosts';
import { RightArrowForChatIcon } from '@/components/icons/Icons';
import logoutWithUser from '@/lib/auth/clientAuth';
import Link from 'next/link';

const UserInfo = () => {
  return (
    <div>
      <Link href="/my-page/my-profile">
        <MyProfile />
      </Link>
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
      <div
        className="flex w-full cursor-pointer items-center justify-center px-[20px] py-[28px] text-[#E4290C] focus:outline-none"
        onClick={logoutWithUser}
      >
        로그아웃
      </div>
    </div>
  );
};

export default UserInfo;
