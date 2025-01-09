interface ButtonProps {
  className?: string;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
}

const Button = ({ className, label, onClick, children, type }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {label}
      {children}
    </button>
  );
};

export default Button;
