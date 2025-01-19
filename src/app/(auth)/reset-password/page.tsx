import type { Metadata } from 'next';

import ResetPwForm from '@app/(auth)/reset-password/_components/ResetPwForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ON:SON 비밀번호 재설정',
  description: '비밀번호를 재설정하여 안전하게 로그인하세요.'
};

const ResetPwPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Link href="/">뒤로</Link>
      <h1 className="mb-8 text-3xl font-bold">비밀번호 재설정</h1>
      <ResetPwForm />
    </div>
  );
};

export default ResetPwPage;
