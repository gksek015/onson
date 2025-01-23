import type { Metadata } from 'next';

import Link from 'next/link';

import SetPageTitle from '@/app/(auth)/_components/SetPageTitle';
import LoginForm from '@app/(auth)/login/_components/LoginForm';

export const metadata: Metadata = {
  title: 'ON:SON 회원가입',
  description: 'ON:SON은 일반 로그인과 소셜로그인을 제공합니다. 안전하게 로그인하세요.'
};

const LoginPage = () => {
  return (
    <div className="auth_page_wrapper">
      <SetPageTitle title="로그인" />
      <LoginForm />
      <div className="auth_bottom_text_wrapper">
        {/* <Link className="auth_bottom_text_small mt-[36px]" href="reset-password">
          비밀번호 찾기
        </Link> */}
        <Link className="auth_bottom_text_normall mt-[24px]" href="sign-up">
          아직 가입하지 않으셨나요?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
