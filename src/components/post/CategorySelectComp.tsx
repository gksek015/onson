import type { FormData } from '@/types/formdata';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { useEffect, useState } from 'react';
import {ModalSheet} from '@/components/common/ModalSheet'

interface CategorySelectProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  formData: FormData;
}

const CategorySelectComp = ({ categories, onSelectCategory, formData }: CategorySelectProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

    const { open, close } = useDialogStore();

  // 초기값 설정: formData.category를 selectedCategory에 세팅
  useEffect(() => {
    if (formData.category) {
      setSelectedCategory(formData.category);
    }
  }, [formData.category]);

  const handleCheckboxChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleApply = () => {
    onSelectCategory(selectedCategory);
    close();
  };

  return (
    <div>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="봉사 종류 선택"
        value={formData.category}
        className="focus:border-[1.4px] focus:border-primary-3 focus:outline-none tracking-[-0.4px] mt-3 block h-12 w-full flex-grow rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base placeholder-[#868C92]"
        readOnly
        onClick={() => open('sheetB')}
      />

      {/* 바텀시트 */}
      <ModalSheet id='sheetB'>
        <div className="flex-grow overflow-y-auto flex h-full flex-col p-5">
          <h2 className="mb-10 text-2xl font-semibold">봉사 종류</h2>
          <p className="mb-3 text-base font-semibold text-[#222227]">종류 선택</p>
          <ul className="space-y-4 border-t border-[#BEBEBE]">
            {categories?.map((category) => (
              <li
                key={category}
                className="mt-4 flex cursor-pointer items-center justify-between p-3"
                onClick={() => handleCheckboxChange(category)}
              >
                <span className="text-base font-medium text-[#242628]">{category}</span>
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id={category}
                    checked={selectedCategory.includes(category)}
                    onChange={(e) => {
                      e.stopPropagation();
                    }}
                    className="border-primary-3 h-4 w-4 cursor-pointer appearance-none rounded-full border checked:bg-white"
                  />
                  {/* 내부 채워진 동그라미 */}
                  <span
                    className={`bg-primary-3 absolute h-2 w-2 rounded-full transition-transform ${
                      selectedCategory.includes(category) ? 'scale-100' : 'scale-0'
                    }`}
                  ></span>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleApply}
            className="bg-primary-3 mt-4 w-full rounded-[8px] px-4 py-3 text-lg text-white"
          >
            적용하기
          </button>
        </div>
      </ModalSheet>
    </div>
  );
};

export default CategorySelectComp;
