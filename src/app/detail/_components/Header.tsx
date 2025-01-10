'use client'; 

import { GrFormPrevious } from 'react-icons/gr';
import { useRouter } from 'next/navigation';

// 상세글 헤더 부분

const Header = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <header className="flex items-center justify-between border-b p-2">
      <button onClick={handleBack} className="text-gray-600">
        <GrFormPrevious size={24} />
      </button>
    </header>
  );
};

export default Header;
