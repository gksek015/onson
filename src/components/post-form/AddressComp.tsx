import type { FormData } from '@/types/formdata';
import AddressSearch from '@/components/common/AddressSearch';
import { ModalSheet } from '@/components/common/ModalSheet';
import { useDialogStore } from '@/utils/store/useDialogStore';

interface AddressCompProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

const AddressComp = ({ formData, setFormData }: AddressCompProps) => {
  const { open, close } = useDialogStore();

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
      <span className="px-2 text-sm font-light text-[#595d61]">* 필수</span>
      </div>
      <input
        type="text"
        id="address"
        name="address"
        readOnly
        placeholder="지역 선택"
        value={formData.address}
        className="focus:border-[1.4px] focus:border-primary-3 focus:outline-none px-3 py-[10px] tracking-[-0.4px] mt-3 block h-12 w-full rounded-[8px] border border-[#A1A6AA] text-base placeholder-[#868C92]"
        onClick={() => open('sheetA')}
      />

      <ModalSheet id="sheetA" title='위치'>
        {/* 전달되는 Content 컴포넌트 */}
        <AddressSearch
          option={'select'}
          onSelect={(selectedAddress) => {
            handleAddressSelect(selectedAddress); // 선택된 주소를 처리
          }}
        />
      </ModalSheet>
    </div>
  );
};

export default AddressComp;
