import type { Metadata } from 'next';

import Link from 'next/link';

import SetPageTitle from '@app/(auth)/_components/SetPageTitle';
import SignUpForm from '@app/(auth)/sign-up/_components/SignUpForm';

export const metadata: Metadata = {
  title: 'ON:SON 회원가입',
  description: 'ON:SON에 오신것을 환영합니다. ON:SON의 회원이 되시고 따뜻한 봉사의 손길을 전해주세요'
};

const SignUpPage = () => {
  return (
    <>
      <div className="auth_page_wrapper desktop:flex desktop:justify-center">
        <SetPageTitle title="회원가입" />
        <SignUpForm />
        <div className="auth_bottom_text_wrapper desktop:hidden">
          <Link href="/login" className="mt-[24px]">
            이미 계정이 있으신가요?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
