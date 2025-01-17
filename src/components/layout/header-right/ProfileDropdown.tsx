'use client';

import { MyProfileIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';
import { supabase } from '@/utils/supabase/client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ProfileDropdown = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 드롭다운을 열기위한 토글글
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdown((prev) => !prev);
  };

  // 비동기적인 드롭다운 닫기 처리
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // 로그아웃, 클라이언트 상태 초기화, 카카오 로그아웃 후 리다이렉트
  const logoutWithUser = async () => {
    try {
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

      const logoutRedirectUri = process.env.NEXT_PUBLIC_BASE_URL;
      const result = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=${logoutRedirectUri}`;

      // 클라이언트 상태 초기화
      useUserStore.getState().clearUser();

      // 카카오 로그아웃
      window.location.href = result;
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} aria-expanded={isDropdown}>
        <MyProfileIcon />
      </button>
      {isDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
          <ul>
            <li className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100">
              <Link href="/my-page">마이페이지</Link>
            </li>
            <li className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100">
              <Link href="/continue-chat">대화 이어가기</Link>
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={() => {
                setIsDropdown(false);
              }}
            >
              <button onClick={logoutWithUser}>로그아웃</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
