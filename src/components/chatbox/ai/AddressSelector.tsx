'use client';

import { useDialogStore } from '@/utils/store/useDialogStore';
import { ModalSheet } from '@/components/common/ModalSheet';
import AddressSearch from '@/components/common/AddressSearch';

interface AddressSelectorProps {
  onSelect: (address: string) => void;
}

const AddressSelector = ({ onSelect }: AddressSelectorProps) => {
  const { open, close } = useDialogStore();

  const handleAddressSelect = (selectedAddress: string) => {
    onSelect(selectedAddress);
    close(); 
  };

  return (
    <div>
      <button
        onClick={() => open('chatbot_address')}
        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-left text-base"
      >
        📍 봉사 지역 선택
      </button>

      <ModalSheet id="chatbot_address" title="지역을 선택하세요">
        <AddressSearch option="select" onSelect={handleAddressSelect} />
      </ModalSheet>
    </div>
  );
};

export default AddressSelector;
