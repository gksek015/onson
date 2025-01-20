const Spinner = () => {
  return (
    <div className="mb-6 mt-3 flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 p-1">
        <div className="h-full w-full rounded-full bg-[#F2F2F2]"></div>
      </div>
      <div>온손이 고민중 ...</div>
    </div>
  );
};

export default Spinner;
