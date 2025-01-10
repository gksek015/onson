import type { Metadata } from 'next';

import Link from 'next/link';

import SignUpForm from '@app/(auth)/sign-up/_components/SignUpForm';

export const metadata: Metadata = {
  title: 'ON:SON 회원가입',
  description: 'ON:SON에 오신것을 환영합니다. ON:SON의 회원이 되시고 따뜻한 봉사의 손길을 전해주세요'
};

const SignUpPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Link href="/">뒤로</Link>
        <h1 className="mb-8 text-3xl font-bold">회원가입</h1>
        <SignUpForm />
        <div className="my-5 flex flex-col items-center space-y-2 text-sm">
          <Link href="/login">이미 계정이 있으신가요?</Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
