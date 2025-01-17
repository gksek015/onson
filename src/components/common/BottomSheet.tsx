import clsx from 'clsx';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeAction?: () => void; // 닫기 버튼의 동작을 결정하는 prop(옵션)
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={clsx('fixed inset-0 z-40 bg-black bg-opacity-10 transition-opacity duration-300', {
          'opacity-100': isOpen,
          'pointer-events-none opacity-0': !isOpen
        })}
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div
        className={clsx(
          'fixed left-0 top-0 z-50 h-full w-full transform bg-white shadow-lg transition-transform duration-300 rounded-t-2xl',
          {
            'translate-y-0': isOpen,
            'translate-y-full': !isOpen
          }
        )}
      >
        {/* <div className="flex justify-end p-4">
          <button type='button'  onClick={onClose}>
            x
          </button>
        </div> */}
        <div className="overflow-y-auto max-h-full md:max-h-full">{children}</div>
      </div>
    </>
  );
};
