'use client';

import { checkSupabaseSession } from '@/lib/actions/auth/action';
import { useUserStore } from '@/utils/store/userStore';
import { useEffect } from 'react';

const InitializeUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Supabase 세션 상태 확인
        const sessionData = await checkSupabaseSession();

        if (sessionData.isLoggedIn && sessionData.user) {
          // 로그인된 경우 사용자 정보를 Zustand에 저장
          setUser({
            id: sessionData.user.id,
            email: sessionData.user.email || 'unknown@example.com',
            nickname: sessionData.user.nickname || 'Unknown',
            profileImage: sessionData.user.profileImage || null
          });
        } else {
          // 로그인되지 않은 경우 상태 초기화
          console.log('사용자가 로그인되어 있지 않습니다.');
          clearUser();
        }
      } catch (err) {
        console.error('세션 확인 중 오류:', err);
        // 오류 발생 시 사용자 상태 초기화
        clearUser();
      }
    };

    fetchSession();
  }, [setUser, clearUser]);

  return null;
};

export default InitializeUser;
