import React from 'react';

type InputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, type, placeholder, errorMessage, ...rest }, ref) => {
    return (
      <div className="relative">
        <input
          className={`w-full p-3 bg-inputBackGround text-lightGray rounded-sm border border-zinc-800 focus:outline-none placeholder-placeholder ${className}`}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      </div>
    );
  }
);

AuthInput.displayName = 'Input';

export default AuthInput;
