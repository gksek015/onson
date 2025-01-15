interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="relative flex items-center justify-between p-4 text-black">
      <h1 className="text-lg font-bold">{title}</h1>
      <button onClick={onClose} className="absolute right-4 text-xl">
        ✖️
      </button>
    </div>
  );
};

export default ModalHeader;
