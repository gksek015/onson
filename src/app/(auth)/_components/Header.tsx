'use client';

import { BackButtonIcon } from '@/components/icons/Icons';
import useIsMobile from '@/hooks/ui/useIsMobile';
import { usePageTitleStore } from '@/utils/store/pageTitleStore';
import { usePathname, useRouter } from 'next/navigation';
import 'react-spring-bottom-sheet-updated/dist/style.css';

const Header = () => {
  const router = useRouter();

  const title = usePageTitleStore((state) => state.title);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push('/'); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  //브라우저 좌우 사이즈 상태 및 변경
  const isMobile = useIsMobile();

  const pathname = usePathname();

  const isAuthPage = !isMobile && (pathname.startsWith('/my-page') || pathname.startsWith('/user-page'));

  if (isAuthPage) return null;
  return (
    <>
      <div className="relative flex h-[60px] items-center justify-center leading-[60px]">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 pl-[18px]" onClick={handleBack}>
          <BackButtonIcon />
        </button>

        <h1 className="text-center text-[20px] font-bold">{title}</h1>
      </div>
    </>
  );
};

export default Header;
