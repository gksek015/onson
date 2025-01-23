'use client';

import AddressSearch from '../common/AddressSearch';
import { BottomSheet } from '../common/BottomSheet';
import { SearchIcon } from '../icons/Icons';
import { useBottomSheetStore } from '@/utils/store/useBottomSheetStore';

const AddressButton = () => {
    const { open } = useBottomSheetStore();

  return (
    <div className="relative flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-[#F99A2C] to-[#FA5571]">
      <input
        readOnly
        placeholder="어디에서 봉사활동을 하고 싶으신가요?"
        className="w-full flex-1 cursor-pointer rounded-full border border-[#FB657E] p-0.5 px-5 py-3.5 text-base text-black shadow-input focus:outline-none"
        onClick={() => open('sheetF')}
      />
      <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>

      {/* BottomSheet */}
      <BottomSheet id='sheetF'>
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch option={'search'} />
      </BottomSheet>
    </div>
  );
};

export default AddressButton;
