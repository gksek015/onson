'use client';

import { BackButtonIcon } from '@/components/icons/Icons';
import { usePageTitleStore } from '@/utils/store/pageTitleStore';
import { useRouter } from 'next/navigation';
import 'react-spring-bottom-sheet-updated/dist/style.css';

const Header = () => {
  const router = useRouter();
  // const pathname = usePathname();
  const title = usePageTitleStore((state) => state.title);

  const handleBack = () => {
    // const segments = pathname.split('/').filter(Boolean);
    // if (segments.length > 1) {
    //   const parentPath = '/' + segments.slice(0, -1).join('/');
    //   router.push(parentPath);
    // } else {
    //   router.push('/');
    // }
    if (window.history.length > 1) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push('/'); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  return (
    <div className="relative flex h-[60px] items-center justify-center leading-[60px]">
      <button className="absolute left-0 top-1/2 -translate-y-1/2 pl-[18px]" onClick={handleBack}>
        <BackButtonIcon />
      </button>

      <h1 className="text-center text-lg font-bold">{title}</h1>
    </div>
  );
};

export default Header;
