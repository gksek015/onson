'use client';

import { BottomSheet } from '@/components/common/BottomSheet';
import { FilterIcon } from '@/components/icons/Icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface CategorySelectProps {
  categories: string[];
}

const CategoryButton = ({ categories }: CategorySelectProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
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
    setIsSheetOpen(false);
  };

  return (
    <div>
      <button type="button" className="rounded-full border-[#FB657E] p-3.5 border" onClick={() => setIsSheetOpen(true)}>
        <FilterIcon />
      </button>
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
                  checked={selectedCategory === category}
                  onChange={(e) => {
                    e.stopPropagation();
                  }}
                  className="cursor-pointer rounded border-gray-300 focus:ring-indigo-500"
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={applyFilter}
            className="mt-4 w-full rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-indigo-600"
          >
            적용하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default CategoryButton;
