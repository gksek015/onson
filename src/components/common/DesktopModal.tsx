import { CloseIcon } from '../icons/Icons';

interface DesktopModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const DesktopModal = ({ isOpen, onClose, children, title }: DesktopModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 반투명 배경 */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* 모달 */}
      <div className="fixed w-[608px] h-[605px] bg-white rounded-lg shadow-lg z-50 
                      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      flex flex-col overflow-hidden">

        {/* 헤더: 제목과 닫기 버튼을 같은 줄에 배치 */}
        <div className="flex items-center justify-between p-5">
          <h2 className="text-2xl font-semibold tracking-[-0.5px]">{title}</h2>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex-grow overflow-auto py-4">
          {children}
        </div>
      </div>
    </>
  );
};
