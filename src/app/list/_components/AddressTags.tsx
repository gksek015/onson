'use client';

import AddressSearch from '@/components/common/AddressSearch';
import { ModalSheet } from '@/components/common/ModalSheet';
import { CloseIcon, MapPinIcon } from '@/components/icons/Icons';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AddressTags = () => {
  const { open, close } = useDialogStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tag, setTag] = useState(searchParams.get('addressKeyword'));

  // 태그 초기화 (전체로 전환)
  const resetToAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('addressKeyword');
    params.delete('address');
    router.push(`?${params.toString()}`);
    setTag('전 지역');
  };

  const handleAddressSelect = (searchKeyword: string) => {
    setTag(searchKeyword);
    close();
  };

  return (
    <div className="flex justify-start text-xs desktop:pb-5">
      {/* tag가 null이거나 falsy하면 렌더링 안하기 */}
      {tag && (
        <div
          onClick={() => open('sheetD')}
          className="flex cursor-pointer rounded-lg border border-[#e6e6e6] py-1.5 pl-2 pr-2"
        >
          <MapPinIcon />
          <span className="text-sm text-[#656565]">{tag}</span>

          {tag !== '전 지역' && ( // 태그가 '전 지역'가 아닐 때만 닫기 버튼 보여줌
            <button
              className="ml-3"
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 전파 중단
                resetToAll(); // 태그를 '전 지역'로 변경
              }}
            >
              <CloseIcon width="14px" height="14px" />
            </button>
          )}
        </div>
      )}

      {/* BottomSheet */}
      <ModalSheet id="sheetD" title="위치">
        {/* AddressSearch를 바텀시트에 렌더링 */}
        <AddressSearch option={'search'} onAddressSelect={handleAddressSelect} />
      </ModalSheet>
    </div>
  );
};

export default AddressTags;
