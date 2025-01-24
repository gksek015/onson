'use client';

import { useEffect, useState } from 'react';

const UpScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event handler
  const handleScroll = () => {
    // 유저가 300px 이상 스크롤하면 버튼 표시
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 페이지 최상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드럽게 스크롤
    });
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 z-50 rounded-full bg-white py-2 px-3 text-neutral-800 shadow-md"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default UpScrollButton;
