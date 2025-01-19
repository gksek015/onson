'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { supabase } from '@/utils/supabase/client';
import { userLoginSchema } from '@lib/revalidation/userSchema';

type LoginFormData = z.infer<typeof userLoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(userLoginSchema)
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await login(formData);
  };

  const kakaoLogin = async () => {
    const currentUrl: string = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${currentUrl}/api/auth/callback`
      }
    });
  };

  return (
    <div className="w-[768px] max-w-full space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <p>아이디</p>
        <AuthInput type="email" placeholder="email" {...register('email')} errorMessage={errors.email?.message} />
        <p>비밀번호</p>
        <AuthInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <Button className="btn-gray" type="submit" label="로그인" />
        <div className="mt-4 flex justify-center">
          <Button className="btn-yellow" type="button" onClick={kakaoLogin} label="카카오 소셜로그인" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
