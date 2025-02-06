'use client';

import { BackButtonIcon, HomeDesktopLogoIcon } from '@/components/icons/Icons';
import useIsMobile from '@/hooks/ui/useIsMobile';
import { usePageTitleStore } from '@/utils/store/pageTitleStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-spring-bottom-sheet-updated/dist/style.css';

const Header = () => {
  const router = useRouter();
  const title = usePageTitleStore((state) => state.title);
  const pathname = usePathname();

  // 최상단에서 훅 호출
  const isMobileCheck = useIsMobile();

  // 클라이언트 여부를 체크하는 상태 추가
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트 렌더링 이후 true 설정
    setIsMobile(isMobileCheck); // useEffect에서 상태 업데이트
  }, [isMobileCheck]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push('/'); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const isAuthPage = isClient && !isMobile && (pathname.startsWith('/my-page') || pathname.startsWith('/user-page'));

  if (isAuthPage) return null;

  return (
    <>
      <div className="relative flex h-[60px] w-full max-w-[1440px] items-center justify-center px-[20px] py-[8px] leading-[60px] desktop:mx-auto desktop:px-[80px]">
        {isClient && (
          <button
            onClick={isMobile ? handleBack : handleLogoClick}
            className={`absolute left-0 top-1/2 -translate-y-1/2 ${isMobile ? 'pl-[18px]' : 'pl-[80px]'}`}
          >
            {isMobile ? <BackButtonIcon /> : <HomeDesktopLogoIcon />}
          </button>
        )}
        <h1 className="text-center text-[20px] font-bold">{title}</h1>
      </div>
    </>
  );
};

export default Header;
