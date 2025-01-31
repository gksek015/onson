import React from 'react';

type InputProps = {
  errorMessage?: string;
  errorMessageStyle?: string; // 에러 메시지에 적용할 추가 스타일
} & React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(function AuthInput(props, ref) {
  const { type, placeholder, errorMessage, errorMessageStyle, ...rest } = props;

  return (
    <>
      <input className={'common_input'} placeholder={placeholder} type={type} ref={ref} {...rest} />
      {errorMessage && <p className={`common_input_err_massege ${errorMessageStyle}`}>{errorMessage}</p>}
    </>
  );
});

export default AuthInput;
