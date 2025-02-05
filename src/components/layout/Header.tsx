'use client';

import { usePathname } from 'next/navigation';
import ChatIcon from './header/ChatIcon';
import HeaderLogo from './header/HeaderLogo';
import IsLogin from './header/IsLogin';
import LeftSide from './header/LeftSide';

const Header = () => {
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/create') ||
    pathname.startsWith('/post-update');

  const isMobileVisible = pathname === '/' || pathname.startsWith('/list');

  if (isAuthPage) return null;

  return (
    <header
      className={`maxWidth-[1440px] flex h-[56px] justify-center bg-white px-[20px] py-[8px] desktop:flex desktop:h-[72px] desktop:w-full desktop:px-[80px] desktop:py-4 ${isMobileVisible ? 'mobile:block' : 'mobile:hidden'}`}
    >
      <div className="flex w-full max-w-content items-center justify-between">
        <div className="flex flex-row items-center">
          <HeaderLogo />
          <LeftSide />
        </div>
        <div className="flex flex-row items-center justify-center gap-10">
          <ChatIcon />
          <IsLogin />
        </div>
      </div>
    </header>
  );
};

export default Header;
