'use client';
import { ArrowIcon } from '../icons/HomeIcons';

const CategoryBar = () => {
  return (
    <div className="relative">
      <button
        className="box-border flex justify-center items-center px-4 py-2
      border rounded-full bg-white text-sm text-gray-600
      hover:bg-gray-100 focus:ring-gray-300 transition
      whitespace-nowrap min-h-[38px]"
      >
        <ArrowIcon />
      </button>
    </div>
  );
};

export default CategoryBar;
