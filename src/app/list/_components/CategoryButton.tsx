'use client';

import { BottomSheet } from '@/components/common/BottomSheet';
import { FilterIcon } from '@/components/icons/Icons';
import { useBottomSheetStore } from '@/utils/store/useBottomSheetStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface CategorySelectProps {
  categories: string[];
}

const CategoryButton = ({ categories }: CategorySelectProps) => {
        const { open, close } = useBottomSheetStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (category: string) => {
    setSelectedCategory(category);
  };

  const applyFilter = () => {
    if (selectedCategory) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('category', selectedCategory); // 'category' 파라미터 업데이트

      router.push(`/list?${currentParams.toString()}`);
    }
    close();
  };

  return (
    <div>
      <button type="button" className="rounded-full border border-[#FB657E] p-3.5" onClick={() => open('sheetE')}>
        <FilterIcon />
      </button>
      {/* 바텀시트 */}
      <BottomSheet id='sheetE'>
        <div className="flex-grow overflow-y-auto flex h-full flex-col p-5">
          <h2 className="mb-10 text-2xl font-semibold">봉사 종류</h2>
          <p className="mb-3 text-base font-semibold text-[#222227]">종류 선택</p>
          <ul className="mt-2 space-y-4 border-t border-[#BEBEBE]">
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
            onClick={applyFilter}
            className="bg-primary-3 mt-4 w-full rounded-[8px] px-4 py-3 text-lg text-white"
          >
            적용하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default CategoryButton;
