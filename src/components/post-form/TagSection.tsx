import type { FormData } from '@/types/formdata';
import CategorySelectComp from '@/components/post-form/CategorySelectComp';
import DateComp from '@/components/post-form/DateComp';

interface TagSectionProps {
  categories: string[];
  formData: FormData;
  onSelectCategory: (category: string) => void;
  onSelectDate: (range: [Date, Date]) => void;
}

const TagSection = ({ categories, formData, onSelectCategory, onSelectDate }: TagSectionProps) => {
  return (
    <div>
      <div className="flex items-center">
        <label htmlFor="tag" className="block text-lg font-semibold tracking-[-0.5px]">
          태그
        </label>
        <span className="px-2 text-sm font-light text-[#595d61]">* 필수</span>
      </div>
      <div className="space-y-4">
        <CategorySelectComp formData={formData} categories={categories} onSelectCategory={onSelectCategory} />
        <DateComp onSelectRange={onSelectDate} formData={formData} />
      </div>
    </div>
  );
};

export default TagSection;
