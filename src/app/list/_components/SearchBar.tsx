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
    <div className="relative flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-[#F99A2C] to-[#FA5571]">
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="키워드를 검색하세요"
        className="w-full flex-1 cursor-pointer rounded-full border border-[#FB657E] p-0.5 px-5 py-3.5 text-base text-black shadow-input focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-5 top-1/2 -translate-y-1/2 transform text-[#4b4b4b]"
      >
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
