'use client';

import { usePathname } from 'next/navigation';
import ChatIcon from './header/ChatIcon';
import HeaderLogo from './header/HeaderLogo';
import IsLogin from './header/IsLogin';
import LeftSide from './header/LeftSide';

const Header = () => {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  const isMobileVisible = pathname === '/' || pathname.startsWith('/list');

  if (isAuthPage) return null;

  return (
    <header
      className={`maxWidth-[1440px] flex h-[56px] justify-center bg-white px-[20px] py-[8px] desktop:left-0 desktop:top-0 desktop:flex desktop:w-full ${isMobileVisible ? 'mobile:block' : 'mobile:hidden'}`}
    >
      <div className="flex w-full max-w-content items-center justify-between">
        <div className="flex flex-row items-center">
          <HeaderLogo />
          <LeftSide />
        </div>
        <div className="flex flex-row items-center gap-6">
          <ChatIcon />
          <IsLogin />
        </div>
      </div>
    </header>
  );
};

export default Header;
