// hooks/useGetUserChatInfo.ts
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export const useGetUserChatInfo = () => {
  const [userId, setUserId] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session?.user?.id) {
        setError('사용자가 로그인 되어있지 않습니다.');
        return;
      }

      setUserId(data.session.user.id);
    };

    fetchUserId();
  }, []);

  return { userId, error };
};
