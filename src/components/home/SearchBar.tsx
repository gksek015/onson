'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchIcon } from '../icons/HomeIcons';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const [tag, setTag] = useState(searchParams.get('searchKeyword'));
  const removeKeyword = () => {
    setTag(null);
  };
  return (
    <div className="relative w-2/3">
      <input type="text" placeholder="검색어를 입력하세요" className="w-full rounded-full border px-4 py-2 text-sm" />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>

      {/* tag가 null이거나 falsy하면 렌더링 안하기 */}
      {tag && (
        <div>
          {tag}
          <button onClick={removeKeyword}>x</button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
