import type { Metadata } from 'next';

import SetPageTitle from '@app/(auth)/_components/SetPageTitle';
import ResetPwForm from '@app/(auth)/reset-password/_components/ResetPwForm';

export const metadata: Metadata = {
  title: 'ON:SON 비밀번호 재설정',
  description: '비밀번호를 재설정하여 안전하게 로그인하세요.'
};

const ResetPwPage = () => {
  return (
    <div className="auth_page_wrapper">
      <SetPageTitle title="비밀번호 재설정" />
      <ResetPwForm />
    </div>
  );
};

export default ResetPwPage;
