import { CloseIcon } from '../icons/Icons';

interface DesktopModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DesktopModal = ({ isOpen, onClose, children }: DesktopModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 반투명 배경 */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* 모달 */}
      <div className="fixed left-1/2 top-1/2 z-50 flex h-[605px] w-[608px] -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-auto rounded-lg bg-white shadow-lg">
        <div className="relative flex h-[60px] items-center justify-end p-4">
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex-grow overflow-auto px-6">{children}</div>
      </div>
    </>
  );
};
