interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeAction?: () => void; // 닫기 버튼의 동작을 결정하는 prop(옵션)
}

export const BottomSheet = ({ isOpen, onClose, children, closeAction }: BottomSheetProps) => {
  // closeAction prop이 전달되면 사용하고 안되면 onClose 사용
  const handleClose = closeAction || onClose;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-full transform bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-end p-4">
          {/* 닫기 버튼 */}
          <button className="text-xl text-gray-500 hover:text-gray-700" onClick={handleClose} >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
};
