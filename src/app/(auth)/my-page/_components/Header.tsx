'use client';

import { BackButtonIcon } from '@/components/icons/Icons';
import { usePageTitleStore } from '@/utils/store/pageTitleStore';
import { usePathname, useRouter } from 'next/navigation';
import 'react-spring-bottom-sheet-updated/dist/style.css';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const title = usePageTitleStore((state) => state.title);

  const handleBack = () => {
    if (pathname.startsWith('/my-page/') && pathname !== '/my-page') {
      router.push('/my-page');
    } else if (pathname === '/my-page') {
      router.push('/');
    }
  };

  return (
    <div className="relative border-b px-2 py-4">
      <button className="absolute left-0 top-1/2 -translate-y-1/2" onClick={handleBack}>
        <BackButtonIcon />
      </button>

      <h1 className="text-center text-lg font-bold">{title}</h1>
    </div>
  );
};

export default Header;
