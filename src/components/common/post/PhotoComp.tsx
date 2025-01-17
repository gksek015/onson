"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      "img_url" in image ? image.img_url : URL.createObjectURL(image)
    );
    setPreviewUrls(initialPreviews);
  }, [formData.images]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      if (formData.images.length + newFiles.length > 5) {
        setError("이미지는 최대 5장까지만 업로드할 수 있습니다.");
        return;
      }

      onImageSelect(newFiles);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const removedFile = formData.images[index];

    if ("img_url" in removedFile) {
      onRemoveImage(removedFile.img_url);
    } else if (removedFile instanceof File) {
      onRemoveImage(removedFile);
    }

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-7 border-t border-[#BEBEBE] px-7">
      <div className="flex flex-wrap gap-3 mt-2">
        {/* 업로드 버튼 */}
        <label
          htmlFor="photo-upload"
          className={`w-24 h-24 bg-[#F4F5F5] rounded-[8px] flex items-center justify-center border cursor-pointer ${
            formData.images.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          📷
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
          <div
            key={index}
            className="relative w-24 h-24 border rounded-[8px] overflow-hidden"
          >
            <Image
              width={100}
              height={100}
              src={imgUrl}
              alt={`img-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs p-1 rounded-full border-white"
              onClick={() => handleRemoveFile(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PhotoComp;
