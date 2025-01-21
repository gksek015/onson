import clsx from 'clsx';
import { useBottomSheetStore } from '@/utils/store/useBottomSheetStore';
import { CloseIcon } from '../icons/Icons';

interface BottomSheetProps {
  id: string; // 바텀시트의 고유 ID
  children: React.ReactNode;
}

export const BottomSheet = ({ id, children }: BottomSheetProps) => {
  const { activeId, close } = useBottomSheetStore();

  // 현재 바텀시트가 활성 상태인지 확인
  const isOpen = activeId === id;

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
          'fixed left-0 top-0 z-50 h-full w-full transform bg-white shadow-lg transition-transform duration-300 rounded-t-2xl',
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
        <div className="overflow-y-auto max-h-full md:max-h-full">{children}</div>
      </div>
    </>
  );
};
