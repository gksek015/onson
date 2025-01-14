"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PhotoCompProps {
  onImageSelect: (images: File[]) => void;
  onRemoveImage: (imageUrl: string) => void;
  formData: {
    images: (File | { img_url: string })[];
  };
  };


const PhotoComp = ({onImageSelect, onRemoveImage, formData}: PhotoCompProps) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // formData.images의 초기 상태를 기반으로 미리보기 URL 설정
    const initialPreviews = formData.images.map((image) =>
      "img_url" in image ? image.img_url : URL.createObjectURL(image)
    );
    setPreviewUrls(initialPreviews);
  }, [formData.images]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      // 이미지 개수 제한 확인
      if (formData.images.length + newFiles.length > 5) {
        setError("이미지는 최대 5장까지만 업로드할 수 있습니다.");
        return;
      }

      onImageSelect(newFiles);

      // 미리보기 URL 추가
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const removedFile = formData.images[index];

    // 미리보기 URL 해제
    if (typeof removedFile !== "string" && removedFile instanceof File) {
      const removedPreview = previewUrls[index];
      URL.revokeObjectURL(removedPreview); // 메모리 누수 방지
    }

    // 삭제된 파일이 URL인 경우 부모에 전달
    if ("img_url" in removedFile) {
      onRemoveImage(removedFile.img_url);
    }

    // 미리보기 URL 업데이트
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label
          htmlFor="photo-upload"
          className={`w-20 h-20 bg-gray-100 rounded flex items-center justify-center border border-gray-300 cursor-pointer ${
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
