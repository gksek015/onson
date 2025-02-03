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
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>

      {/* 모달 */}
      <div className="fixed w-[608px] h-[605px] bg-white rounded-lg shadow-lg z-50 
                      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      flex flex-col overflow-auto">

          <button type="button" onClick={onClose} className="p-4 flex justify-end">
            <CloseIcon />
          </button>

        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </>
  );
};
