import { useState } from 'react';
import { BottomSheet } from './BottomSheet';

interface CategorySelectProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySelectComp = ({ categories, onSelectCategory }: CategorySelectProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    setSheetOpen(false);
  };

  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        봉사 종류
      </label>
      <input
        type="text"
        id="category"
        name="category"
        value={selectedCategory || '봉사 종류 선택'}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
        readOnly
        onClick={() => setSheetOpen(true)} // 바텀시트 열기
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
        <h2 className="text-lg font-medium mb-4">봉사 종류 선택</h2>
        <ul className="space-y-2">
          {categories?.map((category) => (
            <li
              key={category}
              className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </BottomSheet>
    </div>
  );
};

export default CategorySelectComp;
