'use client';

import { SearchIcon } from '../icons/Icons';

const SearchBar = () => {
  return (
    <div className="relative w-2/3">
      <input
        type="text"
        placeholder="하고 싶은 봉사를 찾아보세요"
        className="w-full cursor-pointer rounded-full border border-red-400 px-4 py-3 text-sm"
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
