'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftSide = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row mobile:hidden desktop:block">
      <Link
        href="/list"
        className={`px-7 py-2 text-xl font-medium ${pathname === '/list' ? 'text-primary-3' : 'text-black'}`}
      >
        봉사게시판
      </Link>
      <Link
        href="/create"
        className={`px-7 py-2 text-xl font-medium ${pathname === '/list' ? 'text-primary-3' : 'text-black'}`}
      >
        봉사요청
      </Link>
    </div>
  );
};

export default LeftSide;
