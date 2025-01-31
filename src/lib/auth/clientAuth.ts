import { useUserStore } from '@/utils/store/userStore';
import { supabase } from '@/utils/supabase/client';

// 로그아웃, 클라이언트 상태 초기화, 카카오 로그아웃 후 리다이렉트
  const logoutWithUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase 로그아웃 오류:', error);
        return { error: error.message };
      }

      // 클라이언트 상태 초기화
      useUserStore.getState().clearUser();

      // const logoutRedirectUri = 'process.env.NEXT_PUBLIC_BASE_URL';
      // const result = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=${logoutRedirectUri}`;

      // 카카오 로그아웃
      window.location.href = window.location.origin;
    } catch (err) {
      if (err instanceof Error) {
        console.error('로그아웃 처리 중 오류:', err.message);
        return { error: err.message };
      } else {
        console.error('알 수 없는 오류 발생:', err);
        return { error: '알 수 없는 오류가 발생했습니다.' };
      }
    }
  };

  export default logoutWithUser;