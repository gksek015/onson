'use client';

import { useUserStore } from '@/utils/store/userStore';
import { useEffect } from 'react';

const InitializeUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(window.location.href, { method: 'GET' });
        const userData = response.headers.get('x-user-data');

        if (userData) {
          const parsedUser = JSON.parse(Buffer.from(userData, 'base64').toString('utf-8'));
          const isSocialLogin = !!parsedUser.user_metadata?.provider;
          setUser(
            {
              id: parsedUser.id,
              email: parsedUser.email,
              nickname: parsedUser.user_metadata?.nickname || parsedUser.user_metadata?.name || 'Unknown',
              profileImage: parsedUser.user_metadata?.profileImage || null
            },
            isSocialLogin // 소셜 로그인 여부 전달
          );
        }
      } catch (error) {
        console.error('사용자 초기화 중 오류:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return null;
};

export default InitializeUser;
