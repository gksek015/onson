import clsx from 'clsx';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300',
          {
            'opacity-100': isOpen,
            'opacity-0 pointer-events-none': !isOpen
          }
        )}
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div
        className={clsx(
          'fixed top-0 left-0 w-full h-full bg-white z-50 shadow-lg transition-transform duration-300 transform',
          {
            'translate-y-0': isOpen,
            'translate-y-full': !isOpen
          }
        )}
      >
        <div className="flex justify-end p-4">
          {/* 닫기 버튼 */}
          <button type='button' className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
};