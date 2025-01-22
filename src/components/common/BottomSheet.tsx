import clsx from 'clsx';
import { useEffect } from 'react';
import { useBottomSheetStore } from '@/utils/store/useBottomSheetStore';
import { CloseIcon } from '../icons/Icons';

interface BottomSheetProps {
  id: string;
  children: React.ReactNode;
}

export const BottomSheet = ({ id, children }: BottomSheetProps) => {
  const { activeId, close } = useBottomSheetStore();

  const isOpen = activeId === id;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden'); // 스크롤 방지
    } else {
      document.body.classList.remove('overflow-hidden'); // 스크롤 허용
    }

    return () => {
      document.body.classList.remove('overflow-hidden'); // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [isOpen]);

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={clsx('fixed inset-0 z-40 bg-black bg-opacity-10 transition-opacity duration-300', {
          'opacity-100': isOpen,
          'pointer-events-none opacity-0': !isOpen,
        })}
        onClick={close}
      />

      {/* 바텀시트 */}
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-50 h-full w-full transform bg-white rounded-t-2xl shadow-lg transition-transform duration-300 flex flex-col',
          {
            'translate-y-0': isOpen, // 열림 상태
            'translate-y-full': !isOpen, // 닫힘 상태
          }
        )}
      >
        <div className="flex justify-end p-4">
          <button type="button" onClick={close}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
