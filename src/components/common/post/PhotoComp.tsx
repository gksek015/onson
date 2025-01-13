"use client";

import type { FormData } from "@/types/formdata";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PhotoCompProps {
  onImageSelect: (images: File[]) => void;
  formData: {
    images: Array<{ img_url: string }> | File[];
  };
}

const PhotoComp = ({onImageSelect, formData}: PhotoCompProps) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<File | { img_url: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // 초기 이미지 세팅 (기존 img_url)
    if (formData.images && formData.images.length > 0) {
      const initialPreviews = formData.images.map((image) =>
        "img_url" in image ? image.img_url : URL.createObjectURL(image)
      );
      setSelectedFiles(formData.images);
      setPreviewUrls(initialPreviews);
    }
  }, [formData.images]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = selectedFiles.length + newFiles.length;

      if (totalFiles > 5) {
        setError("이미지는 최대 5장까지만 업로드할 수 있습니다.");
        return;
      }

      // 파일 추가 및 상태 관리
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);


      const updatedPreviewUrls = updatedFiles.map((file) => "img_url" in file ? file.img_url : URL.createObjectURL(file)
      );
      setPreviewUrls(updatedPreviewUrls);
      onImageSelect(updatedFiles.filter((file) => file instanceof File) as File[]);

      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, fileIndex) => fileIndex !== index);
    setSelectedFiles(updatedFiles);

    const updatedPreviewUrls = updatedFiles.map((file) => "img_url" in file ? file.img_url : URL.createObjectURL(file));
    setPreviewUrls(updatedPreviewUrls);

    onImageSelect(updatedFiles.filter((file) => file instanceof File) as File[]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label
          htmlFor="photo-upload"
          className={`w-20 h-20 bg-gray-100 rounded flex items-center justify-center border border-gray-300 cursor-pointer ${
            selectedFiles.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
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
          disabled={selectedFiles.length >= 5}
          ref={fileInputRef}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* 선택한 파일 미리보기 */}
      <div className="grid grid-cols-3 gap-2">
        {previewUrls.map((imgUrl, index) => (
          <div
            key={index}
            className="relative w-20 h-20 border border-gray-300 rounded overflow-hidden"
          >
            <Image
              width={80}
              height={80}
              src={imgUrl} alt={`img-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs p-1 rounded-full"
              onClick={() => handleRemoveFile(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoComp;
