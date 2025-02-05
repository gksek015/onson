import { checkSupabaseSession } from '@/lib/actions/auth/action';
import { useUserStore } from '@/utils/store/userStore';
import { useEffect } from 'react';

/**
 * Supabase 세션을 확인하고 Zustand에 사용자 정보를 저장하는 커스텀 훅
 */
const useInitializeUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Supabase 세션 상태 확인
        const sessionData = await checkSupabaseSession();
  
        if (sessionData.isLoggedIn && sessionData.user) {
          // 로그인된 경우 Zustand 상태 업데이트
          setUser({
            id: sessionData.user.id,
            email: sessionData.user.email || 'unknown@example.com',
            nickname: sessionData.user.nickname || 'Unknown',
            profileImage: sessionData.user.profileImage || null,
          });
        } else {
          // 로그인되지 않은 경우 상태 초기화
          clearUser();
        }
      } catch (err) {
        console.error('세션 초기화 중 오류 발생:', err);
        clearUser();
      }
    };
  
    fetchSession();
  }, [setUser, clearUser]);
};

export default useInitializeUser;