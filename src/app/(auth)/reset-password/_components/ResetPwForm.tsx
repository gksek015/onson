'use client';

import Button from '@/components/common/Button';
import { supabase } from '@/utils/supabase/client';
import AuthInput from '@app/(auth)/_components/AuthInput';
import { useState } from 'react';

const ResetPwForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    try {
      setMessage('');
      setError('');
      const currentUrl = window.location.origin;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${currentUrl}/update-password` // 재설정 후 이동할 페이지
      });

      if (error) {
        setError('비밀번호 재설정 요청에 실패했습니다.');
      } else {
        setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
      }
    } catch (err) {
      if (err instanceof Error) {
        return { error: err.message };
      } else {
        return { error: '알 수 없는 오류가 발생했습니다.' };
      }
    }
  };

  return (
    <div className="w-[768px] max-w-full space-y-4">
      <div className="space-y-4">
        <p>아이디</p>
        <AuthInput
          type="email"
          placeholder="이메일 형식으로 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={error}
        />
        <Button className="btn-gray" onClick={handlePasswordReset} type="submit" label="비밀번호 재설정 링크 보내기" />
      </div>
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};

export default ResetPwForm;
