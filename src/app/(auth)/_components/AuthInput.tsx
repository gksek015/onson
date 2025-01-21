import React from 'react';

type InputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, placeholder, errorMessage, ...rest } = props;

  return (
    <div className="relative">
      <input className={'common_input'} placeholder={placeholder} type={type} ref={ref} {...rest} />
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
});

AuthInput.displayName = 'Input';

export default AuthInput;
