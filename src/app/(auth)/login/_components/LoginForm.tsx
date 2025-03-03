'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { userLoginSchema } from '@/utils/revalidation/userSchema';
import { supabase } from '@/utils/supabase/client';

import { Loading } from '@/components/common/Loading';

import { useState } from 'react';
import Swal from 'sweetalert2';

type LoginFormData = z.infer<typeof userLoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<LoginFormData>({
    resolver: zodResolver(userLoginSchema),
    mode: 'onChange'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (fieldName: keyof LoginFormData) => {
    // 특정 필드에 대해서만 유효성 검사를 실행
    await trigger(fieldName);
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await login(formData);

      if (result.success) {
        // 성공 알림
        await Swal.fire({
          title: '로그인 성공',
          text: result.message,
          icon: 'success',
          confirmButtonText: '확인'
        });

        // 리다이렉트
        window.location.href = '/';
      } else {
        // 실패 알림
        await Swal.fire({
          title: '로그인 실패',
          text: result.message,
          icon: 'error',
          confirmButtonText: '확인'
        });
      }
    } catch (err) {
      console.error('로그인 중 오류 발생:', err);
      await Swal.fire({
        title: '오류',
        text: '예상치 못한 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const kakaoLogin = async () => {
    const currentUrl: string = 'https://onson.kr';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${currentUrl}/api/auth/callback`,
        queryParams: {
          prompt: 'login',
          logLevel: 'debug'
        }
      }
    });
    console.log(data, error);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={`login_wrapper ${isLoading ? 'pointer-events-none opacity-50' : ''}login_wrapper_desktop`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="input_title_label">
            아이디
          </label>
          <AuthInput
            type="email"
            id="title"
            placeholder="email를 입력해주세요"
            {...register('email', {
              onChange: () => handleInputChange('email') // 이메일 입력 시 유효성 검사 실행
            })}
            errorMessage={errors.email?.message}
            errorMessageStyle={errors.email?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <label htmlFor="password" className="input_title_label mobile:mt-[12px] desktop:mt-[28px]">
            비밀번호
          </label>
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', {
              onChange: () => handleInputChange('password') // 비밀번호 입력 시 유효성 검사 실행
            })}
            errorMessage={errors.password?.message}
            errorMessageStyle={errors.password?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <Button className="btn-pink mobile:mt-[28px] desktop:mt-[42px]" type="submit" label="로그인" />
          <Button
            className="btn-kakao mobile:mt-[10px] desktop:mt-[12px]"
            type="button"
            onClick={kakaoLogin}
            label="카카오 소셜로그인"
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
