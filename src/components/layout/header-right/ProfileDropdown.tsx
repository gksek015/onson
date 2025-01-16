'use client';

import { MyProfileIcon } from '@/components/icons/Icons';
import { logout } from '@/lib/actions/auth/action';
import { useUserStore } from '@/utils/store/userStore';

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

  // 클라이언트: 로그아웃 처리 및 디버깅
  const logoutWithUser = async () => {
    try {
      console.log('로그아웃 시작');

      // 서버 로그아웃 호출
      const result = await logout();
      console.log('로그아웃 결과:', result);

      if (result?.error) {
        console.error('Supabase 로그아웃 오류:', result.error);
        return;
      }

      // 클라이언트 상태 초기화
      console.log('클라이언트 상태 초기화');
      useUserStore.getState().clearUser();

      // 카카오 로그아웃 처리
      console.log('카카오 로그아웃 시작');
      const logoutRedirectUri = process.env.NEXT_PUBLIC_BASE_URL;
      setTimeout(() => {
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=${logoutRedirectUri}`;
      }, 100); // 타이밍 보장
    } catch (err) {
      console.error('로그아웃 처리 중 오류:', err);
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
