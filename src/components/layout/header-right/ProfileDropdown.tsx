'use client';

import { MyProfileIcon } from '@/components/icons/Icons';
import logoutWithUser from '@/lib/auth/clientAuth';

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
