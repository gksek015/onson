import { BottomSheet } from '@/components/common/BottomSheet';
import type { FormData } from '@/types/formdata';
import { useEffect, useState } from 'react';

interface CategorySelectProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  formData: FormData
}

const CategorySelectComp = ({ categories, onSelectCategory, formData }: CategorySelectProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

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
    setIsSheetOpen(false);
  };

  return (
    <div>
      {/* <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        봉사 종류
      </label> */}
      <input
        type="text"
        id="category"
        name="category"
        placeholder='봉사 종류 선택'
        value={formData.category}
        className="placeholder-[#868C92] flex-grow mt-3 block w-full h-12 px-2 rounded-[8px] border border-[#A1A6AA] text-base focus:border-indigo-500 focus:ring-indigo-500"
        readOnly
        onClick={() => setIsSheetOpen(true)}
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="p-5">
          <h2 className="mb-10 text-2xl font-semibold">봉사 종류</h2>
          <p className="mb-3 text-base font-semibold text-[#222227]">종류 선택</p>
          <ul className="space-y-4 mt-2 border-t border-[#BEBEBE]">
            {categories?.map((category) => (
              <li
                key={category}
                className="flex cursor-pointer items-center justify-between p-3 mt-4"
                onClick={() => handleCheckboxChange(category)}
              >
                <span className="text-base text-[#242628] font-medium">{category}</span>
                <input
                  type="radio"
                  id={category}
                  checked={selectedCategory.includes(category)}
                  onChange={(e) => {e.stopPropagation()}}
                  className="cursor-pointer h-4 w-4 rounded border-gray-300 checked:bg-[#FB657E] focus:ring-[#FB657E]"
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleApply}
            className="mt-4 w-full rounded-md bg-[#B3B3B3] px-4 py-3 text-lg text-white hover:bg-gray-600"
          >
            적용하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default CategorySelectComp;
