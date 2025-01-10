'use client';
import { useState } from 'react';
import AddressSearch, { type Juso } from '../common/AddressSearch';
import { BottomSheet } from '../common/BottomSheet';
import { ArrowIcon } from '../icons/HomeIcons';

const CategoryButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [keyword, setKeyword] = useState(""); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState<Juso[]>([]); // 검색 결과 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const handleSheetClose = () => {
    setIsSheetOpen(false); // BottomSheet 닫기
  };

  const handleReset = ()=>{
    setIsSheetOpen(false); // BottomSheet 닫기
    setKeyword(''); // 검색창 초기화
    setSearchResults([]); // 검색 결과 초기화
    setError(null); // 에러 메시지 초기화
  }


  return (
    <div className="relative">
      <button
        className="box-border flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100 focus:ring-gray-300"
        onClick={() => setIsSheetOpen(true)}
      >
        <ArrowIcon />
      </button>

      {/* BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose} // 기본 닫기 동작
        closeAction={handleReset} // 상태 초기화 동작
      >
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch
          keyword={keyword}
          setKeyword={setKeyword}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          error={error}
          setError={setError}
        />
      </BottomSheet>
    </div>
  );
};

export default CategoryButton;
