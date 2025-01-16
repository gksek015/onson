'use client';

import { useRouter } from 'next/navigation';
import { BackButtonIcon, ShareIcon } from '@/components/icons/Icons';


// 상세글 헤더 부분
const Header = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push('/list'); 
  };

  return (
    <div className="flex items-center justify-between border-b px-2 py-2">
      <button onClick={handleBack}>
        <BackButtonIcon/>
      </button>
      <button>
        <ShareIcon/>
      </button>
    </div>
  );
};

export default Header;
