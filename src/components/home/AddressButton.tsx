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
    <div className="relative flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-[#F99A2C] to-[#FA5571]">
      <input
        readOnly
        placeholder="하고 싶은 봉사를 찾아보세요"
        className="shadow-input w-full flex-1 cursor-pointer rounded-full border border-[#FB657E] p-0.5 px-5 py-3.5 text-base text-black focus:outline-none"
        onClick={() => setIsSheetOpen(true)}
      />
      <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>

      {/* BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose} // 기본 닫기 동작
      >
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch option={'search'} />
      </BottomSheet>
    </div>
  );
};

export default AddressButton;
