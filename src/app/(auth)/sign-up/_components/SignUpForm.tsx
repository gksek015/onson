'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { signup } from '@lib/actions/auth/action';
import { userSignUpSchema } from '@lib/revalidation/userSchema';

type SignUpFormData = z.infer<typeof userSignUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(userSignUpSchema)
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await signup(formData);
  };

  return (
    <div className="w-[768px] max-w-full space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <p>아이디</p>
        <AuthInput
          type="email"
          placeholder="이메일 형식으로 입력해주세요"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <p>닉네임</p>
        <AuthInput
          type="text"
          placeholder="닉네임을 입력해주세요"
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <p>비밀번호</p>
        <AuthInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <p>비밀번호 확인</p>
        <AuthInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button className="w-full rounded-sm btn-primary-3" type="submit" label="회원가입" />
      </form>
    </div>
  );
};

export default SignUpForm;
