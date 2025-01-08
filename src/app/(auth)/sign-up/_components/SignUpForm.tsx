'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    <div className="w-[500px] max-w-full space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput type="email" placeholder="e-mail" {...register('email')} errorMessage={errors.email?.message} />
        <AuthInput
          type="password"
          placeholder="password"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <AuthInput
          type="password"
          placeholder="confirm password"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <AuthInput
          type="text"
          placeholder="nickname"
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <Button
          className="w-full p-3 bg-buttonBackGround text-white rounded-sm hover:bg-zinc-700 transition-colors"
          type="submit"
          label="회원가입"
        />
      </form>
    </div>
  );
};

export default SignUpForm;
