import React from 'react';
import { SearchIcon } from '../icons/HomeIcons';

const SearchBar = () => {
  return (
    <div className="relative w-2/3">
      <input type="text" placeholder="검색어를 입력하세요" className="w-full px-4 py-2 border rounded-full text-sm" />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
