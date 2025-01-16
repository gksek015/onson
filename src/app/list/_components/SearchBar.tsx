'use client';

import { SearchIcon } from '@/components/icons/Icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (searchKeyword) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('searchedKeyword', searchKeyword); // 'searchKeyword' 파라미터 업데이트

      router.push(`/list?${currentParams.toString()}`);
      setSearchKeyword('');
    }
  };
  return (
    <div className="relative w-2/3">
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // 엔터 키 동작
        placeholder="하고 싶은 봉사를 찾아보세요"
        className="w-full cursor-pointer rounded-full border border-red-400 px-4 py-3 text-sm"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
      >
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
