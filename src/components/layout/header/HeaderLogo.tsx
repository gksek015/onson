'use client';

import { HomeLogoIcon } from '@/components/icons/Icons';
import { useRouter } from 'next/navigation';

const HeaderLogo = () => {
  const router = useRouter();

  return (
    // <Image
    //   src="/ON_SON.png"
    //
    //   alt="온손로고"
    //   width={124}
    //   height={30}
    //   priority
    //   className="cursor-pointer"
    // />
    <button onClick={() => router.push('/')} className="hidden mobile:block desktop:hidden">
      <HomeLogoIcon />
    </button>
  );
};

export default HeaderLogo;
