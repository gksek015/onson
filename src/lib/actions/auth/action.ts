'use server';


import { userLoginSchema } from '@/utils/revalidation/userSchema';

import { createClient } from '@/utils/supabase/server';

import type { AuthError } from '@supabase/supabase-js';

import { User } from '@supabase/supabase-js';

const supabase = createClient(); 
// 회원가입
export const signup = async (formData: FormData) => {
  try {
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

    // Supabase 회원가입 요청
    const { data: userData, error } = await supabase.auth.signUp(data);

    if (error) {
      console.error('회원가입 오류:', error.message);
      return { error: error.message }; // 에러 메시지 반환
    }

    // 사용자 정보를 public users 테이블에 삽입
    const pubilcUserData = {
      id: userData.user?.id,
      email: userData.user?.email,
      nickname: formData.get('nickname') as string,
    };

    const { error: insertError } = await supabase.from('users').insert(pubilcUserData);

    if (insertError) {
      console.error('유저 정보 삽입 오류:', insertError.message);
      return { error: insertError.message };
    }

    console.log('회원가입 성공:', userData);

    return { success: true }; // 성공 반환
  } catch (err) {
    console.error('회원가입 중 알 수 없는 오류:', err);
    return { error: '회원가입 중 알 수 없는 오류가 발생했습니다.' };
  }
};

  

// 로그인
export const login = async (formData: FormData) => {
  const supabase = createClient();

  const result = userLoginSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (!result.success) {
    return {
      success: false,
      message: '유효하지 않은 입력입니다.',
    };
  }

  const { email, password } = result.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      message: error.message.includes('Invalid login credentials')
        ? '이메일 또는 비밀번호가 올바르지 않습니다.'
        : '로그인 중 문제가 발생했습니다.',
    };
  }

  return {
    success: true,
    message: '로그인 성공!',
  };
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

  

export const updateNicknameAndImage = async (formData: FormData) => {
  try {
    const supabase = createClient();

    // 닉네임과 이미지 데이터 가져오기
    const nickname = formData.get('nickname') as string;
    const image = formData.get('profileImage') as File | null;

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

    let profileImageUrl = user.user_metadata?.profileImage || null;

    // 이미지 업로드 처리
    if (image) {
      const bucketName = 'users_bucket';

      // 고유한 파일 이름 생성
      const filename = `${user.id}-${Date.now()}.${image.name.split('.').pop()}`;

      // Supabase 스토리지에 이미지 업로드
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filename, image);

      if (uploadError) {
        console.error('이미지 업로드 오류:', uploadError.message);
        throw new Error('이미지 업로드 중 오류가 발생했습니다.');
      }

      // 업로드된 이미지의 퍼블릭 URL 가져오기
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filename);

      if (!publicUrlData) {
        throw new Error('업로드된 이미지의 URL을 가져올 수 없습니다.');
      }

      profileImageUrl = publicUrlData.publicUrl;
    }

    // 닉네임 업데이트
    const { error: updateError } = await supabase.auth.updateUser({
      data: { nickname, profileImage: profileImageUrl },
    });

    if (updateError) {
      console.error('닉네임 업데이트 오류:', updateError.message);
      throw new Error('닉네임 업데이트에 실패했습니다.');
    }

    // 사용자 테이블 업데이트
    const { error: userTableError } = await supabase
      .from('users')
      .update({ nickname, profile_img_url: profileImageUrl })
      .eq('id', user.id);

    if (userTableError) {
      console.error('사용자 테이블 업데이트 오류:', userTableError.message);
      throw new Error('닉네임 및 이미지 업데이트 중 오류가 발생했습니다.');
    }

    return { nickname, profileImageUrl };
  } catch (err) {
    console.error('닉네임 및 이미지 수정 중 오류 발생:', err);
    throw new Error(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
  }
};

