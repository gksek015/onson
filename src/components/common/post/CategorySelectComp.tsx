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
        className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        readOnly
        onClick={() => setIsSheetOpen(true)}
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="p-4">
          <h2 className="mb-4 text-sm font-medium">봉사 종류 선택</h2>
          <ul className="space-y-2">
            {categories?.map((category) => (
              <li
                key={category}
                className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-200"
                onClick={() => handleCheckboxChange(category)}
              >
                <span className="text-sm text-gray-700">{category}</span>
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategory.includes(category)}
                  onChange={(e) => {e.stopPropagation()}}
                  className="cursor-pointer rounded border-gray-300 focus:ring-indigo-500"
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleApply}
            className="mt-4 w-full rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-indigo-600"
          >
            적용하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default CategorySelectComp;
