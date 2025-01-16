'use server';

import { redirect } from 'next/navigation';

import { userLoginSchema } from '@lib/revalidation/userSchema';

import { getSupabaseClient } from '@/utils/supabase/server';

const supabase = getSupabaseClient(); 
// 회원가입
export const signup = async (formData: FormData) => {

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
        data: {
          nickname: formData.get('nickname') as string,
          profileImage: '', 
        },
      },
  };

  const { data: userData, error } = await supabase.auth.signUp(data);

  const pubilcUserData = {
    id: userData.user?.id,
    email: userData.user?.email,
    nickname: formData.get('nickname') as string
  };

  await supabase.from('users').insert(pubilcUserData);

  if (error) {
    console.log(error);
    redirect('/error');
  }

  redirect('/login');
};

// 로그인
export const login = async (formData: FormData) => {
  
    const result = userLoginSchema.safeParse({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });
  
    if (!result.success) {
      throw new Error(JSON.stringify(result.error.flatten().fieldErrors));
    }
  
    const { email, password } = result.data;
    const { data: userData, error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) {
      throw new Error(error.message);
    }
    
    return {
        id: userData.user?.id || '',
        email: userData.user?.email || '',
        nickname: userData.user?.user_metadata?.nickname || '',
        profileImage: userData.user?.user_metadata?.profileImage || null,
      };
  };

  //카카오 로그인
  export const kakaoLogin = async (currentUrl: string) => {
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao', 
      options: {
        redirectTo: `${currentUrl}/api/auth/callback`, 
        queryParams: {
          prompt: 'login', 
        },
      },
    });
  
    if (error) {
      console.error('카카오 로그인 오류:', error);
      return { error: error.message };
    }
  
    if (data.url) {
      redirect(data.url); 
    }
  };

  
  // 로그아웃
  // 서버 액션: 로그아웃
export const logout = async () => {
    try {
      // Supabase 세션 해제
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase 로그아웃 오류:', error);
        return { error: error.message };
      }
  
      // 로그아웃 후 세션 확인
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        console.error('Supabase 세션이 아직 남아 있습니다:', sessionData);
        return { error: '로그아웃이 제대로 처리되지 않았습니다.' };
      }
  
      console.log('Supabase 로그아웃 성공');
      return {}; // 성공 시 빈 객체 반환
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
  
  