'use client';

import { HomeDesktopLogoIcon, HomeMobileLogoIcon } from '@/components/icons/Icons';
import { useRouter } from 'next/navigation';

const HeaderLogo = () => {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.push('/')} className="mr-[72px] mobile:hidden desktop:block">
        <HomeDesktopLogoIcon />
      </button>

      <button onClick={() => router.push('/')} className="hidden mobile:block desktop:hidden">
        <HomeMobileLogoIcon />
      </button>
    </>
  );
};

export default HeaderLogo;
