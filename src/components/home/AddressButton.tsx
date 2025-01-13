'use client';
import { useState } from 'react';
import AddressSearch from '../common/AddressSearch';
import { BottomSheet } from '../common/BottomSheet';
import { SearchIcon } from '../icons/HomeIcons';

const AddressButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false); // BottomSheet 닫기
  };

  return (
    <div className="relative w-2/3">
      {/* <div className="w-full rounded-full border px-4 py-2 text-sm" onClick={() => setIsSheetOpen(true)}>
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
          <span className="sr-only">Search</span>
          <SearchIcon />
        </button>
      </div> */}

      <input
        readOnly
        placeholder="검색어를 입력하세요"
        className="w-full cursor-pointer rounded-full border px-4 py-2 text-sm"
        onClick={() => setIsSheetOpen(true)}
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>

      {/* BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose} // 기본 닫기 동작
      >
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch />
      </BottomSheet>
    </div>
  );
};

export default AddressButton;
