'use server';

import { redirect } from 'next/navigation';

import { userLoginSchema } from '@lib/revalidation/userSchema';

import { createClient } from '@/utils/supabase/server';

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
  
  //console.log('세션 데이터:', userData);
 