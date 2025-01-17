import { useState } from "react";
import { BottomSheet } from "@/components/common/BottomSheet";
import AddressSearch from "@/components/common/AddressSearch";
import type { FormData } from "@/types/formdata";

interface AddressCompProps {
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

const AddressComp = ({formData, setFormData} : AddressCompProps) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleSheetClose = () => {
      setIsSheetOpen(false); // BottomSheet 닫기
    };

    const handleAddressSelect = (selectedAddress: string) => {
        // 선택된 주소를 formData와 input에 반영
        setFormData((prev) => ({ ...prev, address: selectedAddress }));
        handleSheetClose(); // BottomSheet 닫기
      };

  return (
    <div>
        <label htmlFor="address" className="block text-base font-semibold">
          위치
        </label>
        <input
          type="text"
          id="address"
          name="address"
          readOnly
        placeholder="지역 선택"
          value={formData.address}
          className="placeholder-[#868C92] mt-3 block w-full h-12 px-2 rounded-[8px] border border-[#A1A6AA] text-base focus:border-indigo-500 focus:ring-indigo-500"
          onClick={() => setIsSheetOpen(true)}
        />

<BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose} // 기본 닫기 동작
      >
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch 
        option={'select'} 
        onSelect={(selectedAddress) => {
            handleAddressSelect(selectedAddress); // 선택된 주소를 처리
          }}
        />
      </BottomSheet>
      </div>

  )
}

export default AddressComp