'use client';

import LoginForm from '@/app/(auth)/login/_components/LoginForm';
import { ModalSheet } from '@/components/common/ModalSheet';
import { MyProfileIcon } from '@/components/icons/Icons';
import useIsMobile from '@/hooks/ui/useIsMobile';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { useUserStore } from '@/utils/store/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const IsLogin = () => {
  const { user } = useUserStore(); // 로그인 상태 확인
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { open, close } = useDialogStore();

  //브라우저 좌우 사이즈 상태 및 변경
  const isMobile = useIsMobile();

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
          onClick={isMobile ? handleProfileClick : () => open('loginModal')}
          className="text-sm font-medium text-gray-600 hover:text-gray-800"
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
      {/* BottomSheet */}
      <ModalSheet id="loginModal">
        {/* 전달되는 Content 컴포넌트 */}
        <h1 className="absolute left-1/2 top-[16px] -translate-x-1/2 text-[20px] font-bold">로그인</h1>
        <LoginForm />
        <div className="auth_bottom_text_wrapper">
          <Link
            className="auth_bottom_text_normall mobile:mt-[24px] desktop:mt-[36px]"
            href="sign-up"
            onClick={() => close()}
          >
            회원가입
          </Link>
        </div>
      </ModalSheet>
    </div>
  );
};

export default IsLogin;
