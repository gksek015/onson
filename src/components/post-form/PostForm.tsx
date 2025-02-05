import type { FormData } from '@/types/formdata';
import dayjs from 'dayjs';
import AddressComp from '@/components/post-form/AddressComp';
import ContentComp from '@/components/post-form/ContentComp';
import PhotoComp from '@/components/post-form/PhotoComp';
import TagSection from '@/components/post-form/TagSection';
import TitleComp from '@/components/post-form/TitleComp';

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
    <div className="min-h-screen pt-[60px]">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[800px] pt-7">
        <div className="space-y-7 px-5">
          <TitleComp value={formData.title} onChange={handleInputChange} />
          <AddressComp formData={formData} setFormData={setFormData} />
          <TagSection
            categories={categories}
            formData={formData}
            onSelectCategory={handleCategorySelect}
            onSelectDate={handleDateSelect}
          />
          <ContentComp value={formData.content} onChange={handleInputChange} />
        </div>
        <PhotoComp onRemoveImage={handleRemoveImage} onImageSelect={handleImageSelect} formData={formData} />
      </form>
    </div>
  );
};

export default PostForm;
