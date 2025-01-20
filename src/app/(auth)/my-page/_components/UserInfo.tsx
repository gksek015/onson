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
      <Link className="flex w-full items-center justify-between px-4 py-6 focus:outline-none" href="/my-page/bookmarks">
        <span className="font-bold">관심있는 봉사</span>
        <RightArrowForChatIcon />
      </Link>
      <QuickMyBookmarks />
      <Link className="flex w-full items-center justify-between px-4 py-6 focus:outline-none" href="/my-page/my-posts">
        <span className="font-bold">나의 봉사요청</span>
        <RightArrowForChatIcon />
      </Link>
      <QuickMyPosts />
      <div
        className="flex w-full items-center justify-center px-4 py-6 text-[#E4290C] focus:outline-none"
        onClick={logoutWithUser}
      >
        로그아웃
      </div>
    </div>
  );
};

export default UserInfo;
