import CategorySelectComp from '@/components/common/post/CategorySelectComp';
import DateComp from '@/components/common/post/DateComp';
import PhotoComp from '@/components/common/post/PhotoComp';

import type { FormData } from '@/types/formdata';
import dayjs from 'dayjs';
import AddressComp from '@/components/common/post/AddressComp';

interface PostFormProps {
  categories: string[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

const PostForm = ({ categories, setFormData, formData }: PostFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleDateSelect = (range: [Date, Date]) => {
    const [startDate, endDate] = range;

    setFormData((prev) => ({
      ...prev,
      date: dayjs(startDate).format('YYYY-MM-DD'),
      end_date: dayjs(endDate).format('YYYY-MM-DD')
    }));
  };

  // handleImageSelect: 새 파일 추가
  const handleImageSelect = (newFiles: File[]) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles] // 기존 이미지 + 새 파일
    }));
  };

  // handleRemoveImage: 이미지 삭제
  const handleRemoveImage = (imageUrlOrFile: string | File) => {
    setFormData((prev) => ({
      ...prev,
      deletedImages: [
        ...prev.deletedImages,
        typeof imageUrlOrFile === 'string' ? imageUrlOrFile : '' // URL만 추가
      ].filter(Boolean), // 빈 문자열 제거
      images: prev.images.filter((img) => {
        if (typeof imageUrlOrFile === 'string') {
          return img instanceof File || img.img_url !== imageUrlOrFile;
        } else {
          return !(img instanceof File && img === imageUrlOrFile);
        }
      })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-[calc(100vh-60px)] overflow-y-auto pb-20">
      <form className="mt-7 space-y-7 px-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="ex) 어르신 보조, 드론의 재능기부, 환경 정리 등"
            className="mt-1 block w-full h-12 px-2 rounded-md border border-gray-300 text-base placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleInputChange}
          />
        </div>

        <AddressComp formData={formData} setFormData={setFormData} />

        <div>
          <label htmlFor="tag" className="block text-lg font-medium text-gray-700">
            태그
          </label>
          <div className="flex items-center space-x-4">
            <CategorySelectComp formData={formData} categories={categories} onSelectCategory={handleCategorySelect} />
            <DateComp onSelectRange={handleDateSelect} formData={formData} />
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <label htmlFor="content" className="block text-lg font-medium text-gray-700">
              본문
            </label>
            <span className="ml-3 text-xs font-normal text-gray-400">*500자 이내</span>
          </div>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            placeholder={`필요한 준비물이나 유의사항을 적어주세요.
    ex) 봉사 시 강도가 높아 무거운 물건을 드는데 자신 있는 분을 찾습니다.`}
            rows={5}
            maxLength={500}
            className="py-2 px-2 mt-1 block w-full whitespace-pre-line rounded-md border border-gray-300 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleInputChange}
          />
        </div>

        <PhotoComp onRemoveImage={handleRemoveImage} onImageSelect={handleImageSelect} formData={formData} />
      </form>
    </div>
  );
};

export default PostForm;