'use client';

import { logout } from '@/lib/actions/auth/action';

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

  const logoutWithUser = async () => {
    await logout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* <Image
        src="https://picsum.photos/200/300​"
        alt="Profile"
        className="cursor-pointer rounded-full border border-gray-300 object-cover"
        width={40}
        height={40}
        onClick={toggleDropdown}
        role="button"
        aria-expanded={isDropdown}
      /> */}

      <svg width="30" height="30" viewBox="0 0 30 30" fill="black" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="#D9D9D9" />
        <path
          d="M19.6211 17.1394C19.8585 17.1393 20.0936 17.186 20.313 17.2768C20.5324 17.3676 20.7318 17.5007 20.8997 17.6686C21.0676 17.8364 21.2008 18.0357 21.2917 18.2551C21.3826 18.4744 21.4294 18.7095 21.4294 18.9469V19.4091C21.4294 20.1276 21.1722 20.8236 20.7045 21.3685C19.4427 22.8424 17.5242 23.5698 14.9966 23.5698C12.4682 23.5698 10.5506 22.8424 9.29203 21.3677C8.8262 20.822 8.57029 20.1281 8.57031 19.4107V18.9469C8.57021 18.7095 8.61688 18.4744 8.70767 18.255C8.79846 18.0356 8.93158 17.8363 9.09943 17.6683C9.26729 17.5004 9.46658 17.3672 9.68593 17.2763C9.90528 17.1854 10.1404 17.1386 10.3778 17.1386H19.6211V17.1394ZM19.6211 18.345H10.3778C10.2987 18.3449 10.2203 18.3604 10.1472 18.3906C10.0741 18.4208 10.0076 18.4651 9.95164 18.521C9.89566 18.5769 9.85125 18.6433 9.82095 18.7164C9.79064 18.7895 9.77505 18.8678 9.77505 18.9469V19.4107C9.77505 19.8415 9.92936 20.2578 10.209 20.5849C11.2161 21.7647 12.7961 22.3642 14.9966 22.3642C17.1971 22.3642 18.7788 21.7647 19.7882 20.5849C20.0687 20.2573 20.2229 19.8403 20.223 19.4091V18.9469C20.2231 18.8678 20.2077 18.7895 20.1775 18.7163C20.1472 18.6432 20.1029 18.5768 20.047 18.5208C19.9911 18.4648 19.9247 18.4204 19.8516 18.3901C19.7785 18.3598 19.7002 18.3442 19.6211 18.3442V18.345ZM14.9966 7.49835C16.0624 7.49835 17.0845 7.92172 17.8381 8.67533C18.5917 9.42894 19.0151 10.4511 19.0151 11.5168C19.0151 12.5826 18.5917 13.6047 17.8381 14.3583C17.0845 15.1119 16.0624 15.5353 14.9966 15.5353C13.9309 15.5353 12.9088 15.1119 12.1552 14.3583C11.4015 13.6047 10.9782 12.5826 10.9782 11.5168C10.9782 10.4511 11.4015 9.42894 12.1552 8.67533C12.9088 7.92172 13.9309 7.49835 14.9966 7.49835ZM14.9966 8.70389C14.6272 8.70389 14.2615 8.77665 13.9202 8.91801C13.5789 9.05937 13.2688 9.26657 13.0076 9.52778C12.7464 9.78898 12.5392 10.0991 12.3978 10.4404C12.2565 10.7816 12.1837 11.1474 12.1837 11.5168C12.1837 11.8862 12.2565 12.252 12.3978 12.5933C12.5392 12.9346 12.7464 13.2446 13.0076 13.5058C13.2688 13.7671 13.5789 13.9743 13.9202 14.1156C14.2615 14.257 14.6272 14.3297 14.9966 14.3297C15.7427 14.3297 16.4581 14.0334 16.9857 13.5058C17.5132 12.9783 17.8096 12.2628 17.8096 11.5168C17.8096 10.7708 17.5132 10.0553 16.9857 9.52778C16.4581 9.00025 15.7427 8.70389 14.9966 8.70389Z"
          fill="white"
          onClick={toggleDropdown}
          role="button"
          aria-expanded={isDropdown}
        />
      </svg>

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
