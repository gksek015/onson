import { BackButtonIcon, CloseIcon } from '@/components/icons/Icons';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  onBack: () => void;
}

const ModalHeader = ({ onBack, title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 text-black">
      <button onClick={onBack} className="left-4 text-xl text-black">
        <BackButtonIcon />
      </button>
      <h1 className="text-lg font-bold">{title}</h1>
      <button onClick={onClose} className="right-4 text-xl">
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalHeader;
