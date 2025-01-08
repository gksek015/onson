'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

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
    <div className="relative w-10 h-10" ref={dropdownRef}>
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
        onClick={toggleDropdown}
      />
      {isDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul>
            <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
              <Link href="/my-page">마이페이지</Link>
            </li>
            <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
              <Link href="/continue-chat">대화 이어가기</Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={() => {
                setIsDropdown(false);
              }}
            >
              <button>로그아웃</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
