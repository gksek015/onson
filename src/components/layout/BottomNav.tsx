const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-100 border-t p-3 flex justify-around">
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <span>🏠</span>
        <span className="text-xs">홈</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <span>📄</span>
        <span className="text-xs">봉사 요청</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <span>🔍</span>
        <span className="text-xs">봉사 찾기</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <span>👤</span>
        <span className="text-xs">마이페이지</span>
      </button>
    </nav>
  );
};

export default BottomNav;
