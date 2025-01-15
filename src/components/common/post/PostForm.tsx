import CategorySelectComp from '@/components/common/post/CategorySelectComp';
import DateComp from '@/components/common/post/DateComp';
import PhotoComp from '@/components/common/post/PhotoComp';

import type { FormData } from '@/types/formdata';
import dayjs from 'dayjs';
import AddressComp from './AddressComp';

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

  // const handleAddressSelect = (selectedAddress: string) => {
  //   // 선택한 주소를 input에 표시하고 formData에 저장
  //   setFormData((prev) => ({ ...prev, address: selectedAddress }));
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative h-[calc(100vh-60px)] overflow-y-auto pb-[80px]">
      <form className="mt-[28px] space-y-5 px-5 py-4" onSubmit={handleSubmit}>
        <div className="mb-[28px]">
          <label htmlFor="title" className="block text-[18px] font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="ex) 어르신 보조, 드론의 재능기부, 환경 정리 등"
            className="mt-1 block h-[28px] w-full rounded-md border border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={handleInputChange}
          />
        </div>

        <AddressComp formData={formData} setFormData={setFormData} />

        <div className="mt-[28px] space-y-1">
          <label htmlFor="tag" className="block text-[18px] font-medium text-gray-700">
            태그
          </label>
          <div className="flex items-center justify-between space-x-4">
            <CategorySelectComp formData={formData} categories={categories} onSelectCategory={handleCategorySelect} />
            <DateComp onSelectRange={handleDateSelect} formData={formData} />
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <label htmlFor="content" className="block text-[18px] font-medium text-gray-700">
              본문
            </label>
            <span className="ml-3 text-xs font-normal text-gray-400">*500자 이내</span>
          </div>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            placeholder="필요한 준비물이나 유의사항을 적어주세요.              ex) 봉사 시 강도가 높아 무거운 물건을 드는데 자신 있는 분을 찾습니다."
            rows={4}
            maxLength={500}
            className="mt-1 block h-[90px] w-full rounded-md border border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleInputChange}
          />
        </div>

        <PhotoComp onRemoveImage={handleRemoveImage} onImageSelect={handleImageSelect} formData={formData} />
      </form>
    </div>
  );
};

export default PostForm;
