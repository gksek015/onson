'use client';

import { CameraIcon, RoundCloseIcon } from '@/components/icons/Icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface PhotoCompProps {
  onImageSelect: (images: File[]) => void;
  onRemoveImage: (imageUrl: string | File) => void;
  formData: {
    images: (File | { img_url: string })[];
  };
}

const PhotoComp = ({ onImageSelect, onRemoveImage, formData }: PhotoCompProps) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const initialPreviews = formData.images.map((image) =>
      'img_url' in image ? image.img_url : URL.createObjectURL(image)
    );
    setPreviewUrls(initialPreviews);
  }, [formData.images]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      if (formData.images.length + newFiles.length > 5) {
        setError('이미지는 최대 5장까지만 업로드할 수 있습니다.');
        return;
      }

      onImageSelect(newFiles);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const removedFile = formData.images[index];

    if ('img_url' in removedFile) {
      onRemoveImage(removedFile.img_url);
    } else if (removedFile instanceof File) {
      onRemoveImage(removedFile);
    }

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-7 border-t border-[#BEBEBE] px-5">
      <div className="mt-2 flex flex-wrap gap-3">
        {/* 업로드 버튼 */}
        <label
          htmlFor="photo-upload"
          className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-[8px] border bg-[#F4F5F5] ${
            formData.images.length >= 5 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <CameraIcon/>
        </label>
        <input
          id="photo-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={formData.images.length >= 5}
          ref={fileInputRef}
        />

        {/* 이미지 미리보기 */}
        {previewUrls.map((imgUrl, index) => (
          <div key={index} className="relative h-24 w-24 overflow-hidden rounded-[8px] border">
            <Image width={100} height={100} src={imgUrl} alt={`img-${index}`} className="h-full w-full object-cover" priority/>
            <button
            aria-label='미리보기 삭제'
              type="button"
              className="absolute right-1 top-1"
              onClick={() => handleRemoveFile(index)}
            >
              <RoundCloseIcon/>
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PhotoComp;
