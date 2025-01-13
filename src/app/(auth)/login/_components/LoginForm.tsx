'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { useUserStore } from '@/utils/store/userStore';
import { userLoginSchema } from '@lib/revalidation/userSchema';

type LoginFormData = z.infer<typeof userLoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

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

      const user = await login(formData);
      console.log('loginform====>', user);
      setUser(user);
      console.log('현재 상태:', useUserStore.getState());

      router.push('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
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
        <Button className="w-full rounded-sm bg-[#4B4B4B] p-3 text-white" type="submit" label="로그인" />
      </form>
    </div>
  );
};

export default LoginForm;
