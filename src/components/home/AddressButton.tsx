'use client';
import { useState } from 'react';
import AddressSearch from '../common/AddressSearch';
import { BottomSheet } from '../common/BottomSheet';
import { SearchIcon } from '../icons/Icons';

const AddressButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false); // BottomSheet 닫기
  };

  return (
    <div className="relative w-full">
      <input
        readOnly
        placeholder="하고 싶은 봉사를 찾아보세요"
        className="w-full cursor-pointer rounded-full border border-red-400 px-4 py-3 text-sm"
        onClick={() => setIsSheetOpen(true)}
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>

      {/* BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose} // 기본 닫기 동작
      >
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch option={'search'}/>
      </BottomSheet>
    </div>
  );
};

export default AddressButton;
