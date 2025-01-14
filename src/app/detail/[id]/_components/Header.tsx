'use client';

import { useRouter } from 'next/navigation';
import { GrFormPrevious } from 'react-icons/gr';

// 상세글 헤더 부분
const Header = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push('/'); 
    // TODO:list 페이지 생기면 경로 바꾸기
  };

  return (
    <div className="flex px-2 py-4 items-center justify-between border-b">
      <button onClick={handleBack} className="text-gray-600">
        <GrFormPrevious size={24} />
      </button>
    </div>
  );
};

export default Header;
