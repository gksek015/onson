'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeaderLogo = () => {
  const router = useRouter();

  return (
    <Image
      src="/ON_SON.png"
      onClick={() => router.push('/')}
      alt="온손로고"
      width={124}
      height={30}
      priority
      className="cursor-pointer"
    />
  );
};

export default HeaderLogo;
