'use client';

import AddressSearch from '@/components/common/AddressSearch';
import { BottomSheet } from '@/components/common/BottomSheet';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AddressTags = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tag, setTag] = useState(searchParams.get('addressKeyword'));
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 태그 지우기
  const removeAddress = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('addressKeyword');
    params.delete('address');
    router.push(`?${params.toString()}`);
    setTag(null);
  };

  // 바텀시트 닫기
  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  // 바텀시트 열기
  const openBottomSheet = () => {
    setIsSheetOpen(true);
  };

  const handleAddressSelect = (searchKeyword: string) => {
    setTag(searchKeyword);
    handleSheetClose();
  };

  // useGetPost를 invalidateQuery 사용해서 전체 리스트를 보여주도록 코드 짜고, 닫기 버튼 눌렀을 때 필터링 된게 초기화 되게 하기

  return (
    <div className="flex justify-start text-xs">
      {/* tag가 null이거나 falsy하면 렌더링 안하기 */}
      {tag && (
        <div
          onClick={openBottomSheet}
          className="flex cursor-pointer rounded-lg border border-[#e6e6e6] p-1.5 py-1.5 pl-2 pr-1.5"
        >
          {tag}
          <button
            className="ml-3"
            onClick={(e) => {
              e.stopPropagation();
              removeAddress();
            }}
          >
            X
          </button>
        </div>
      )}

      {/* BottomSheet */}
      <BottomSheet
        isOpen={isSheetOpen} // 바텀시트 열기 조건
        onClose={handleSheetClose} // 바텀시트 닫기 동작
      >
        {/* AddressSearch를 바텀시트에 렌더링 */}
        <AddressSearch option={'search'} onAddressSelect={handleAddressSelect} />
      </BottomSheet>
    </div>
  );
};

export default AddressTags;
