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
    <div className="overflow-visable desktop:fixed desktop:left-0 desktop:top-0 desktop:z-40 desktop:w-full desktop:bg-white">
      <header
        className={`flex h-[56px] w-full max-w-[1440px] items-center justify-between px-[20px] py-[8px] desktop:mx-auto desktop:h-[72px] desktop:px-[80px] desktop:py-4 ${isMobileVisible ? 'mobile:block' : 'mobile:hidden'}`}
      >
        <div className="flex w-full max-w-[1440px] items-center justify-between">
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
    </div>
  );
};

export default Header;
