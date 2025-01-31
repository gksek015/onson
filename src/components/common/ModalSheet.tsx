import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/common/BottomSheet';
import { DesktopModal } from '@/components/common/DesktopModal';
import { useDialogStore } from '@/utils/store/useDialogStore';

interface ModalSheetProps {
  id: string;
  children: React.ReactNode;
}

export const ModalSheet = ({ id, children }: ModalSheetProps) => {
  const { activeId, close } = useDialogStore();
  const isOpen = activeId === id;

  // ✅ 초기값을 `false`로 설정하고, 클라이언트에서 업데이트
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // 서버 환경에서는 실행하지 않음

    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    const updateBodyScroll = () => {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    updateScreenSize(); // 초기 실행 시 화면 크기 설정
    updateBodyScroll(); // 모달 열릴 때 스크롤 방지 적용

    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      document.body.style.overflow = ''; // 모달 닫힐 때 스크롤 복구
    };
  }, [isOpen]); // `isOpen`이 변경될 때 실행

  if (!isOpen) return null;

  return isDesktop 
    ? <DesktopModal id={id} isOpen onClose={close}>{children}</DesktopModal> 
    : <BottomSheet id={id}>{children}</BottomSheet>;
};
