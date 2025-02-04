'use client';

import { MyProfileIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const IsLogin = () => {
  const { user } = useUserStore(); // 로그인 상태 확인
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProfileClick = () => {
    router.push(user ? '/my-page' : '/login');
  };

  if (!isClient) return null; // 서버 렌더링 방지

  return (
    <div className="flex items-center">
      {!user ? (
        <button
          onClick={handleProfileClick}
          className="text-lg font-semibold text-[#818181] desktop:text-xl desktop:font-medium desktop:text-[#343434]"
        >
          로그인
        </button>
      ) : (
        <div>
          <button onClick={handleProfileClick}>
            <MyProfileIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default IsLogin;
