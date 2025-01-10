'use client';
import { useState } from 'react';
import AddressSearch from '../common/AddressSearch';
import { BottomSheet } from '../common/BottomSheet';
import { ArrowIcon } from '../icons/HomeIcons';

const CategoryButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="box-border flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100 focus:ring-gray-300"
        onClick={() => setIsSheetOpen(true)}
      >
        <ArrowIcon />
      </button>
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <AddressSearch />
      </BottomSheet>
    </div>
  );
};

export default CategoryButton;
