import CategorySelectComp from '@/components/common/post/CategorySelectComp';
import DateComp from '@/components/common/post/DateComp';
import PhotoComp from '@/components/common/post/PhotoComp';
import { useState } from 'react';

interface PostFormProps {
  categories: string[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface FormData {
  title: string;
  address: string;
  content: string;
  category: string;
  date: string;
  images: File[]; // 이미지 파일 배열
}

const PostForm: React.FC<PostFormProps> = ({ categories, setFormData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(categories.join(', '));
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleDateSelect = (range: [Date, Date]) => {
    setSelectedRange(range);
    setFormData((prev) => ({
      ...prev,
      date: range[0].toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작 방지
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="지역 선택"
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
          태그
        </label>
        <div className="flex justify-between items-center space-x-4">
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleInputChange}
        />
      </div>

      <PhotoComp onImageSelect={(images: File[]) => setFormData((prev) => ({ ...prev, images }))} />
    </form>
  );
};

export default PostForm;
