'use client';

import { useUserStore } from '@/utils/store/userStore';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect } from 'react';

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn());
  const clearUser = useUserStore((state) => state.clearUser);

  // Supabase 세션 확인 및 상태 동기화
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // 세션이 없으면 상태 초기화
        clearUser();
      }
    };

    checkSession();
  }, [clearUser]);

  if (!isLoggedIn) {
    return <p>로그인되지 않았습니다. 로그인 후 이용해주세요.</p>;
  }

  if (!user) {
    return <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <div>
      <Link href="/my-page/bookmarks">
        <a className="text-blue-500 underline">내 북마크 보기</a>
      </Link>
      <h1>사용자 정보</h1>
      <p>아이디: {user.id}</p>
      <p>이메일: {user.email}</p>
      <p>닉네임: {user.nickname}</p>
    </div>
  );
};

export default UserInfo;
