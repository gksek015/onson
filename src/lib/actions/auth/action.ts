'use server';

import { redirect } from 'next/navigation';

import { userLoginSchema } from '@lib/revalidation/userSchema';

import { createClient } from '@/utils/supabase/server';

import type { AuthError, Session } from '@supabase/supabase-js';

const supabase = createClient(); 
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
  
    console.log('회원가입 요청 데이터:', data);
  
    const { data: userData, error } = await supabase.auth.signUp(data);

    const pubilcUserData = {
        id: userData.user?.id,
        email: userData.user?.email,
        nickname: formData.get('nickname') as string
      };
    
      await supabase.from('users').insert(pubilcUserData);

    if (error) {
      console.error('회원가입 오류:', error.message);
      redirect('/error');
    }
  
    console.log('회원가입 성공:', userData);
  
    // 트리거가 삽입을 처리하므로 추가 삽입 호출 제거
    redirect('/login');
  };
  

// 로그인
export const login = async (formData: FormData) => {
    const supabase = createClient();
  
    const result = userLoginSchema.safeParse({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });
  
    if (!result.success) {
      throw new Error(JSON.stringify(result.error.flatten().fieldErrors));
    }
  
    const { email, password } = result.data;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
  
    redirect('/');
  };
  
  

export const checkSupabaseSession = async () => {
  try {
    const supabase = createClient();

    // 현재 세션 정보 가져오기
    const {
      data,
      error,
    }: {
      data: { session: Session | null };
      error: AuthError | null;
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Supabase 세션 확인 오류:', error.message);
      throw new Error('Supabase 세션 확인에 실패했습니다.');
    }

    const session = data.session;

    if (session?.user) {
      return {
        isLoggedIn: true,
        user: {
          id: session.user.id,
          email: session.user.email,
          nickname: session.user.user_metadata?.nickname || 'Unknown',
          profileImage: session.user.user_metadata?.profileImage || null,
        },
      };
    } else {
      return {
        isLoggedIn: false,
        user: null,
      };
    }
  } catch (err) {
    console.error('Supabase 세션 확인 중 오류 발생:', err);
    throw new Error('Supabase 세션 확인 중 오류 발생.');
  }
};
