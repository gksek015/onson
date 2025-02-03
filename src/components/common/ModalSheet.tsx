import { BottomSheet } from '@/components/common/BottomSheet';
import { DesktopModal } from '@/components/common/DesktopModal';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { useEffect, useState } from 'react';

interface ModalSheetProps {
  id: string;
  children: React.ReactNode;
}

export const ModalSheet = ({ id, children }: ModalSheetProps) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const { activeId, close } = useDialogStore();
  const isOpen = activeId === id;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    const updateBodyScroll = () => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };

    updateScreenSize();
    updateBodyScroll();

    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return isDesktop ? (
    <DesktopModal id={id} isOpen onClose={close}>
      {children}
    </DesktopModal>
  ) : (
    <BottomSheet id={id}>{children}</BottomSheet>
  );
};
