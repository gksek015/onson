import { BottomSheet } from '@/components/common/BottomSheet';
import type { FormData } from '@/types/formdata';
import { useEffect, useState } from 'react';

interface CategorySelectProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  formData: FormData;
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
        placeholder="봉사 종류 선택"
        value={formData.category}
        className="mt-3 block h-12 w-full flex-grow rounded-[8px] border border-[#A1A6AA] px-2 text-base placeholder-[#868C92] focus:border-indigo-500 focus:ring-indigo-500"
        readOnly
        onClick={() => setIsSheetOpen(true)}
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="p-5">
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
          className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-[#FB657E] checked:bg-white"
        />
        {/* 내부 채워진 동그라미 */}
        <span
          className={`absolute h-2 w-2 rounded-full bg-[#FB657E] transition-transform ${
            selectedCategory.includes(category) ? "scale-100" : "scale-0"
          }`}
        ></span>
      </div>
    </li>
  ))}
</ul>


          <button
            type="button"
            onClick={handleApply}
            className="mt-4 w-full rounded-md bg-[#FB657E] px-4 py-3 text-lg text-white hover:bg-gray-600"
          >
            적용하기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default CategorySelectComp;
