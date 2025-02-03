const Spinner = () => {
  return (
    <div className="absolute inset-0 left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 p-1">
          <div className="h-full w-full rounded-full bg-[#F2F2F2]"></div>
        </div>
        <div className="text-lg font-medium text-black">채팅방을 불러오는 중...</div>
      </div>
    </div>
  );
};

export default Spinner;
