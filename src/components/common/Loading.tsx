export const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-4 fixed inset-0 z-50">
        <div className="mb-6 h-16 w-16 animate-spin rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 p-1">
          <div className="h-full w-full rounded-full bg-white"></div>
        </div>
        <div className="text-xl font-medium">로딩중 ...</div>
      </div>
    );
  };