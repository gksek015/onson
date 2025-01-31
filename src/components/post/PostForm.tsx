import type { FormData } from '@/types/formdata';
import dayjs from 'dayjs';
import AddressComp from './AddressComp';
import CategorySelectComp from './CategorySelectComp';
import DateComp from './DateComp';
import PhotoComp from './PhotoComp';

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
    <div className="mt-20 h-[calc(100vh-60px)]">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[800px]">
        <div className="mt-7 space-y-7 px-5">
          <div>
            <div className="flex items-center">
              <label htmlFor="title" className="block text-lg font-semibold tracking-[-0.5px]">
                제목
              </label>
              <span className="px-2 text-sm font-medium text-[#868C92]">* 필수</span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="ex) 어르신 보조, 드로잉 재능기부, 환경 정리 등"
              className="focus:border-primary-3 mt-3 block h-12 w-full rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base tracking-[-0.4px] placeholder-[#868C92] focus:border-[1.4px] focus:outline-none"
              onChange={handleInputChange}
            />
          </div>

          <AddressComp formData={formData} setFormData={setFormData} />

          <div>
            <div className="flex items-center">
              <label htmlFor="tag" className="block text-lg font-semibold tracking-[-0.5px]">
                태그
              </label>
              <span className="px-2 text-sm font-medium text-[#868C92]">* 필수</span>
            </div>
            <div className="space-y-4">
              <CategorySelectComp formData={formData} categories={categories} onSelectCategory={handleCategorySelect} />
              <DateComp onSelectRange={handleDateSelect} formData={formData} />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <label htmlFor="content" className="block text-lg font-semibold tracking-[-0.5px]">
                본문
              </label>
              <span className="ml-3 text-sm font-normal text-[#868C92]">*500자 이내</span>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              placeholder={`필요한 준비물이나 유의사항을 적어주세요.
    ex) 봉사 시 강도가 높아 무거운 물건을 드는데 자신 있는 분을 찾습니다.`}
              rows={4}
              maxLength={500}
              className="focus:border-primary-3 mt-3 block w-full whitespace-pre-line rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base leading-6 placeholder-[#868C92] shadow-sm focus:border-[1.4px] focus:outline-none"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <PhotoComp onRemoveImage={handleRemoveImage} onImageSelect={handleImageSelect} formData={formData} />
      </form>
    </div>
  );
};

export default PostForm;
