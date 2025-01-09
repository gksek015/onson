'use server';

import { redirect } from 'next/navigation';

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
