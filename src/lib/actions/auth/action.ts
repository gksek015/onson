'use server';

import { redirect } from 'next/navigation';

import { userLoginSchema } from '@lib/revalidation/userSchema';

import { supabase } from '@/utils/supabase/server';

// 회원가입
export const signup = async (formData: FormData) => {

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) {
      throw new Error(error.message);
    }
  
    redirect('/');
  };

  // 로그아웃
export const logout = async () => {
    await supabase.auth.signOut();
  
    redirect('/');
  };
  