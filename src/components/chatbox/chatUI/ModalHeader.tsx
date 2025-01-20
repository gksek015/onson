import { CloseIcon } from '@/components/icons/Icons';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 text-black">
      <h1 className="text-lg font-bold">{title}</h1>
      <button onClick={onClose} className="right-4 text-xl">
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalHeader;
