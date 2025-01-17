'use client';

import AddressSearch from '@/components/common/AddressSearch';
import { BottomSheet } from '@/components/common/BottomSheet';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Tags = () => {
  const searchParams = useSearchParams();
  const [tag, setTag] = useState(searchParams.get('addressKeyword'));
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 태그 지우기
  const removeKeyword = () => {
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
    <div className="w-4/5">
      <div className="flex justify-start text-xs">
        {/* tag가 null이거나 falsy하면 렌더링 안하기 */}
        {tag && (
          <div onClick={openBottomSheet} className="cursor-pointer rounded-lg border p-1.5">
            {tag}
            <button
              className="ml-3"
              onClick={(e) => {
                e.stopPropagation();
                removeKeyword();
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
          <AddressSearch onAddressSelect={handleAddressSelect} option={'search'}/>
        </BottomSheet>
      </div>
    </div>
  );
};

export default Tags;
