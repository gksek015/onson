import { useState } from 'react';
import { BottomSheet } from '../BottomSheet';

interface CategorySelectProps {
  categories: string[];
  onSelectCategory: (selectedCategories: string[]) => void;
}

const CategorySelectComp = ({ categories, onSelectCategory }: CategorySelectProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleApply = () => {
    onSelectCategory(selectedCategories);
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
        value={selectedCategories.length > 0 ? selectedCategories.join(', ') : '봉사 종류 선택'}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
        readOnly
        onClick={() => setIsSheetOpen(true)}
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="p-4">
          <h2 className="text-sm font-medium mb-4">봉사 종류 선택</h2>
          <ul className="space-y-2">
            {categories?.map((category) => (
              <li
                key={category}
                className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => handleCheckboxChange(category)}
              >
                <span className="text-sm text-gray-700">{category}</span>
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => e.stopPropagation()}
                  className="rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                />
              </li>
            ))}
          </ul>
          <button
            onClick={handleApply}
            className="mt-4 w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            적용하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default CategorySelectComp;
