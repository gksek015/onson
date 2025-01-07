'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProfileDropdawn = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const closeDropdown = () => {
    setIsDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-10 h-10">
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
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={closeDropdown}>
              <button>로그아웃</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdawn;
