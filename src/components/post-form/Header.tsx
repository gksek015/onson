'use client';

import { useEffect, useState } from 'react';
import { BackIcon, HomeDesktopLogoIcon } from '@/components/icons/Icons';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface HeaderProps {
  title: string;
  onBack: () => void;
  onSubmit: () => void;
  submitLabel: string;
  submitColor?: string;
  isSubmitDisabled?: boolean;
  isUpdatePage?: boolean; // 수정 페이지 여부 (수정 취소 알림용)
}

const Header = ({
  title,
  onBack,
  onSubmit,
  submitLabel,
  submitColor = 'var(--primary-3)',
  isSubmitDisabled = false,
  isUpdatePage = false,
}: HeaderProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleBackButton = () => {
    Swal.fire({
      title: isUpdatePage ? '수정을 취소하시겠습니까?' : '작성 중인 내용이 삭제됩니다.',
      text: '변경 사항이 저장되지 않습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary-3)',
      cancelButtonColor: '#B4B4B4',
      confirmButtonText: '취소',
      cancelButtonText: '아니오',
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onBack();
      }
    });
  };

  const handleLogoClick = () => {
    Swal.fire({
      title: '작성 중인 내용이 사라집니다.',
      text: '홈으로 이동하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary-3)',
      cancelButtonColor: '#B4B4B4',
      confirmButtonText: '홈으로 이동',
      cancelButtonText: '아니오',
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/');
      }
    });
  };

  return (
    <header className="h-[60px] fixed top-0 left-1/2 -translate-x-1/2 z-10 flex w-full max-w-content items-center justify-center border-b bg-white px-4 py-3">
      <button onClick={isMobile ? handleBackButton : handleLogoClick} className="absolute left-4">
        {isMobile ? <BackIcon /> : <HomeDesktopLogoIcon />}
      </button>
      <h1 className="text-xl font-bold tracking-[-0.5px]">{title}</h1>
      <button
  type="submit"
  onClick={onSubmit}
  className={`absolute right-4 text-xl font-medium transition-colors duration-200 tracking-[-0.5px]
    ${isSubmitDisabled ? 'text-[#B4B4B4] cursor-not-allowed' : submitColor === '#424242' ? 'text-gray-800' : 'text-primary-3'}`}
  disabled={isSubmitDisabled}
>
  {submitLabel}
</button>
    </header>
  );
};

export default Header;
