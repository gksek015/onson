'use server';

import { redirect } from 'next/navigation';

import { userLoginSchema } from '@lib/revalidation/userSchema';

import { createClient } from '@/utils/supabase/server';

import type { AuthError } from '@supabase/supabase-js';

import { User } from '@supabase/supabase-js';

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

    const { data, error }: { data: { user: User | null }; error: AuthError | null } =
      await supabase.auth.getUser();

    if (error) {
      console.error('Supabase 사용자 정보 확인 오류:', error.message);
      throw new Error('Supabase 사용자 정보 확인에 실패했습니다.');
    }

    const user = data.user;

    if (user) {
      return {
        isLoggedIn: true,
        user: {
          id: user.id,
          email: user.email || 'Unknown', // 기본값 할당
          nickname: user.user_metadata?.nickname || 'Unknown',
          profileImage: user.user_metadata?.profileImage || null,
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

  

export const updateNickname = async (formData: FormData) => {
  try {
    const supabase = createClient();

    // 닉네임 데이터 가져오기
    const nickname = formData.get('nickname') as string;

    if (!nickname || nickname.trim().length === 0) {
      throw new Error('닉네임을 입력해주세요.');
    }

    // 현재 로그인한 사용자 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('사용자 가져오기 오류:', userError.message);
      throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
    }

    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    // 닉네임 업데이트
    const { error: updateError } = await supabase.auth.updateUser({
      data: { nickname },
    });

    if (updateError) {
      console.error('닉네임 업데이트 오류:', updateError.message);
      throw new Error('닉네임 업데이트에 실패했습니다.');
    }

    // 추가로 사용자 테이블에 업데이트가 필요한 경우
    const { error: userTableError } = await supabase
      .from('users')
      .update({ nickname })
      .eq('id', user.id);

    if (userTableError) {
      console.error('사용자 테이블 업데이트 오류:', userTableError.message);
      throw new Error('닉네임 업데이트 중 오류가 발생했습니다.');
    }

    // 성공 시 리디렉션 또는 성공 메시지 반환
    console.log('닉네임 업데이트 성공');
  } catch (err) {
    console.error('닉네임 수정 중 오류 발생:', err);
    throw new Error(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
  }
};
