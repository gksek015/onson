import React from 'react';

type InputProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(function AuthInput(props, ref) {
  const { type, placeholder, errorMessage, ...rest } = props;

  return (
    <>
      <input className={'common_input'} placeholder={placeholder} type={type} ref={ref} {...rest} />
      {errorMessage && <p className="common_input_err_massege">{errorMessage}</p>}
    </>
  );
});

export default AuthInput;
