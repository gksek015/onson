'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { userLoginSchema } from '@/utils/revalidation/userSchema';
import { supabase } from '@/utils/supabase/client';
import Swal from 'sweetalert2';

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
    try {
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
    }
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
    <>
      <div className="login_wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="input_title_label">
            아이디
          </label>
          <AuthInput
            type="email"
            id="title"
            placeholder="email를 입력해주세요"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <label htmlFor="password" className="input_title_label mt-[12px]">
            비밀번호
          </label>
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password')}
            errorMessage={errors.password?.message}
          />
          <Button className="btn-pink mt-[28px]" type="submit" label="로그인" />
          <Button className="btn-kakao mt-[10px]" type="button" onClick={kakaoLogin} label="카카오 소셜로그인" />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
