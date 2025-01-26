import { BottomSheet } from '@/components/common/BottomSheet';
import type { FormData } from '@/types/formdata';
import AddressSearch from '../AddressSearch';
import { useBottomSheetStore } from '@/utils/store/useBottomSheetStore';

interface AddressCompProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

const AddressComp = ({ formData, setFormData }: AddressCompProps) => {
  const { open, close } = useBottomSheetStore();

  const handleAddressSelect = (selectedAddress: string) => {
    // 선택된 주소를 formData와 input에 반영
    setFormData((prev) => ({ ...prev, address: selectedAddress }));
    close(); // BottomSheet 닫기
  };

  return (
    <div>
      <div className="flex items-center">
      <label htmlFor="address" className="tracking-[-0.5px] block text-lg font-semibold">
        위치
      </label>
      <span className="px-2 text-sm font-medium text-[#868C92]">* 필수</span>
      </div>
      <input
        type="text"
        id="address"
        name="address"
        readOnly
        placeholder="지역 선택"
        value={formData.address}
        className="px-3 py-[10px] tracking-[-0.4px] mt-3 block h-12 w-full rounded-[8px] border border-[#A1A6AA] text-base placeholder-[#868C92]"
        onClick={() => open('sheetA')}
      />

      <BottomSheet id="sheetA">
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch
          option={'select'}
          onSelect={(selectedAddress) => {
            handleAddressSelect(selectedAddress); // 선택된 주소를 처리
          }}
        />
      </BottomSheet>
    </div>
  );
};

export default AddressComp;
