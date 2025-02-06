'use client';

import { useState } from 'react';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { ModalSheet } from '@/components/common/ModalSheet';
import { categories } from '@/constants/categories';

interface CategorySelectorProps {
  onSelect: (categories: string[]) => void; // 선택된 카테고리 배열을 AI 챗봇에 전달
}

const CategorySelector = ({ onSelect }: CategorySelectorProps) => {
  const { open, close } = useDialogStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleApply = () => {
    onSelect(selectedCategories); 
    close();
  };

  return (
    <div>
      <button
        onClick={() => open('chatbot_category')}
        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-left text-base"
      >
        🏷️ {selectedCategories.length > 0 ? `선택됨: ${selectedCategories.join(', ')}` : '봉사 종류 선택'}
      </button>

      <ModalSheet id="chatbot_category" title="봉사 종류 선택">
        <ul className="space-y-2 p-4">
          {categories.map((category) => (
            <li
              key={category}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 text-lg ${
                selectedCategories.includes(category) ? 'bg-primary-3 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                readOnly
                className="accent-primary-3 h-5 w-5"
              />
            </li>
          ))}
        </ul>

        <div className="p-4">
          <button onClick={handleApply} className="bg-primary-3 w-full rounded-lg px-4 py-3 text-lg text-white">
            적용하기
          </button>
        </div>
      </ModalSheet>
    </div>
  );
};

export default CategorySelector;
