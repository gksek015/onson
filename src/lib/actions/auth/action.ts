'use server';


import { userLoginSchema } from '@/utils/revalidation/userSchema';

import { createClient } from '@/utils/supabase/server';

import type { AuthError } from '@supabase/supabase-js';

import { User } from '@supabase/supabase-js';

// 회원가입
export const signup = async (formData: FormData) => {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      nickname: formData.get('nickname') as string
    };

    const supabase = createClient();

    // 닉네임 중복 체크
    const { count: nicknameCount, error: nicknameCheckError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('nickname', data.nickname);

    if (nicknameCount && nicknameCount > 0) {
      console.error('이미 사용 중인 닉네임입니다.');
      return { error: '이미 사용 중인 닉네임입니다.' };
    }

    if (nicknameCheckError) {
      console.error('닉네임 조회 오류:', nicknameCheckError.message);
      return { error: '닉네임 확인 중 오류가 발생했습니다.' };
    }

    // 이메일 중복 체크 (회원가입 전에 미리 체크)
    const { count: emailCount, error: emailCheckError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('email', data.email);

    if (emailCount && emailCount > 0) {
      console.error('이미 가입된 이메일입니다.');
      return { error: '이미 가입된 이메일입니다.' };
    }

    if (emailCheckError) {
      console.error('이메일 조회 오류:', emailCheckError.message);
      return { error: '이메일 확인 중 오류가 발생했습니다.' };
    }

    // Supabase 회원가입
    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nickname: data.nickname,
          profileImage: ''
        }
      }
    });

    if (signUpError) {
      console.error('회원가입 오류:', signUpError.message);
      return { error: signUpError.message };
    }

    await supabase.auth.signOut();

    // users 테이블에 사용자 정보 저장
    const publicUserData = {
      id: userData.user?.id,
      email: userData.user?.email,
      nickname: data.nickname
    };

    const { error: insertError } = await supabase.from('users').insert(publicUserData);

    if (insertError) {
      console.error('유저 정보 삽입 오류:', insertError.message);
      return { error: insertError.message };
    }

    return { success: true };

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
          nickname: user.user_metadata?.nickname || user.user_metadata?.name || 'Unknown',
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
    const nickname = formData.get('nickname') as string | null;
    const image = formData.get('profileImage') as File | null;

    // 현재 로그인한 사용자 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('사용자 가져오기 오류:', userError.message);
      return { error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' };
    }

    if (!user) {
      return { error: '로그인이 필요합니다.' };
    }

    let profileImageUrl = user.user_metadata?.profileImage || null;

    // 닉네임 중복 체크 (count 방식 적용)
    if (nickname && nickname !== user.user_metadata?.nickname) {
      const { count: nicknameCount, error: nicknameCheckError } = await supabase
        .from('users')
        .select('id', { count: 'exact', head: true }) 
        .eq('nickname', nickname);

      if (nicknameCheckError) {
        console.error('닉네임 조회 오류:', nicknameCheckError.message);
        return { error: '닉네임 확인 중 오류가 발생했습니다.' };
      }

      if (nicknameCount && nicknameCount > 0) {
        console.error('이미 사용 중인 닉네임입니다.');
        return { error: '이미 사용 중인 닉네임입니다.' };
      }
    }

    // 이미지 업로드 처리
    if (image) {
      const bucketName = 'users_bucket';
      const filename = `${user.id}-${Date.now()}.${image.name.split('.').pop()}`;

      const { error: uploadError } = await supabase.storage.from(bucketName).upload(filename, image);
      if (uploadError) {
        console.error('이미지 업로드 오류:', uploadError.message);
        return { error: '이미지 업로드 중 오류가 발생했습니다.' };
      }

      // 업로드된 이미지의 퍼블릭 URL 가져오기
      const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filename);
      profileImageUrl = publicUrlData.publicUrl;
    }

    // 닉네임 또는 프로필 이미지 업데이트
    const updateData: { nickname?: string; profileImage?: string } = {};
    if (nickname) updateData.nickname = nickname;
    if (profileImageUrl) updateData.profileImage = profileImageUrl;

    const { error: updateError } = await supabase.auth.updateUser({ data: updateData });
    if (updateError) {
      console.error('유저 메타데이터 업데이트 오류:', updateError.message);
      return { error: '유저 메타데이터 업데이트에 실패했습니다.' };
    }

    // users 테이블 업데이트
    const userTableUpdateData: { nickname?: string; profile_img_url?: string } = {};
    if (nickname) userTableUpdateData.nickname = nickname;
    if (profileImageUrl) userTableUpdateData.profile_img_url = profileImageUrl;

    const { error: userTableError } = await supabase
      .from('users')
      .update(userTableUpdateData)
      .eq('id', user.id);

    if (userTableError) {
      console.error('사용자 테이블 업데이트 오류:', userTableError.message);
      return { error: '닉네임 및 이미지 업데이트 중 오류가 발생했습니다.' };
    }

    return { nickname: nickname || user.user_metadata?.nickname || user.user_metadata?.name, profileImageUrl };
  } catch (err) {
    console.error('닉네임 및 이미지 수정 중 오류 발생:', err);
    return { error: '알 수 없는 오류가 발생했습니다.' };
  }
};
