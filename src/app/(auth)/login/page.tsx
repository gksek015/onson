import type { Metadata } from 'next';

import Link from 'next/link';

import { BackIcon } from '@/components/icons/Icons';
import LoginForm from '@app/(auth)/login/_components/LoginForm';

export const metadata: Metadata = {
  title: 'ON:SON 회원가입',
  description: 'ON:SON은 일반 로그인과 소셜로그인을 제공합니다. 안전하게 로그인하세요.'
};

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative mb-10 flex w-full items-center justify-center">
        <Link href="/" className="absolute left-3">
          <BackIcon />
        </Link>
        <h1 className="text-3xl font-bold">로그인</h1>
      </div>
      <LoginForm />
      <div className="flex flex-col items-center space-y-2 text-sm">
        <Link className="m-3" href="reset-password">
          비밀번호 찾기
        </Link>
        <Link className="m-3" href="sign-up">
          아직 가입하지 않으셨나요?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
