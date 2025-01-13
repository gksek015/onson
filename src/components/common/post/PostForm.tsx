import { useEffect, useState } from 'react';

import CategorySelectComp from '@/components/common/post/CategorySelectComp';
import DateComp from '@/components/common/post/DateComp';
import PhotoComp from '@/components/common/post/PhotoComp';

import type { FormData } from '@/types/formdata';

interface PostFormProps {
  categories: string[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PostForm = ({ categories, setFormData }: PostFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    console.log(selectedCategory, selectedRange);
  }, [selectedCategory, selectedRange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleDateSelect = (range: [Date, Date]) => {
    setSelectedRange(range);
    setFormData((prev) => ({
      ...prev,
      date: range[0].toISOString().split('T')[0]
    }));
  };

  const handleImageSelect = (images: File[]) => {
    setFormData((prev) => ({
      ...prev,
      images, // 이미지 배열 업데이트
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          위치
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="지역 선택"
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
          태그
        </label>
        <div className="flex items-center justify-between space-x-4">
          <CategorySelectComp categories={categories} onSelectCategory={handleCategorySelect} />
          <DateComp onSelectRange={handleDateSelect} />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          본문 (500자 이내)
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          maxLength={500}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={handleInputChange}
        />
      </div>

      <PhotoComp onImageSelect={handleImageSelect} />
    </form>
  );
};

export default PostForm;
