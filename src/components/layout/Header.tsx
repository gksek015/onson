'use client';

// import logo from '@/assets/ON_SON.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IsLogin from './header-right/IsLogin';
import RightSide from './header-right/RightSide';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-center bg-white p-4">
      <div className="flex w-full max-w-content items-center justify-between">
        {/* 로고부분 */}
        <Image src="/ON_SON.png" onClick={() => router.push('/')} alt="온손로고" width={124} height={30} priority />
        <div className="hidden sm:block">
          <RightSide />
        </div>
        <div className="block sm:hidden">
          <IsLogin />
        </div>
      </div>
    </header>
  );
};

export default Header;
