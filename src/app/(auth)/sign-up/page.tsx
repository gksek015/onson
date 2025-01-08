import type { Metadata } from 'next';

import Link from 'next/link';

import SignUpForm from '@app/(auth)/sign-up/_components/SignUpForm';

export const metadata: Metadata = {
  title: 'SEEWHAT 회원가입',
  description:
    'SEEWHAT에 새로운 계정을 만들고 가입하세요. 간편한 회원가입 절차를 통해 SEEWHAT의 다양한 서비스를 이용해보세요.'
};

const SignUpPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-3xl font-bold mb-8">SEEWHAT</h1>
        <SignUpForm />
        <div className="flex flex-col items-center space-y-2 text-sm text-darkGray my-5">
          <Link href="/login" className="hover:text-white my-1">
            이미 계정이 있으신가요? Login
          </Link>
          <Link href="/" className="hover:text-white">
            홈페이지로 이동하기 Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
