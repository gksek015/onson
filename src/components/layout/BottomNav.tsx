import Link from 'next/link';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-100 border-t p-4 flex justify-around">
      {/* 홈 버튼 */}
      <Link href="/" className="flex flex-col items-center hover:text-blue-600">
        <span>🏠</span>
        <span className="text-sm text-black font-bold">홈</span>
      </Link>

      {/* 게시글 작성 버튼 */}
      <Link href="/create" className="flex flex-col items-center  hover:text-blue-600">
        <span>📄</span>
        <span className="text-sm text-black font-bold">봉사 요청</span>
      </Link>

      {/* 게시글 리스트 페이지 이동 버튼 */}
      <Link href="list" className="flex flex-col items-center hover:text-blue-600">
        <span>🔍</span>
        <span className="text-sm text-black font-bold">봉사 찾기</span>
      </Link>

      {/* 게시글 리스트 페이지 이동 버튼 */}
      <Link href="list" className="flex flex-col items-center hover:text-blue-600">
        <span>💬</span>
        <span className="text-sm text-black font-bold">채팅하기</span>
      </Link>

      {/* 마이페이지 */}
      <Link href="my-page" className="flex flex-col items-center hover:text-blue-600">
        <span>👤</span>
        <span className="text-sm text-black font-bold">마이페이지</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
