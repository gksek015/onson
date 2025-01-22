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
    <div className="sign_up_wrapper">
      <p className="info_message_wrapper">
        가입 시 입력한 비밀번호를 잊으셨나요?
        <br />
        비밀번호를 재설정할 수 있습니다
      </p>
      <label htmlFor="title" className="input_title_label">
        아이디
      </label>
      <AuthInput
        type="email"
        id="title"
        placeholder="이메일 형식으로 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={error}
      />
      <Button
        className="btn-pink mt-[28px]"
        onClick={handlePasswordReset}
        type="submit"
        label="비밀번호 재설정 링크 보내기"
      />
      {message && <p className="">{message}</p>}
    </div>
  );
};

export default ResetPwForm;
