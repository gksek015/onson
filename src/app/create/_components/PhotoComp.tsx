"use client";

import Image from "next/image";
import { useState } from "react";

const PhotoComp = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = selectedFiles.length + newFiles.length;

      // 5장 초과 시 에러 메시지 표시
      if (totalFiles > 5) {
        setError("이미지는 최대 5장까지만 업로드할 수 있습니다.");
        return;
      }

      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setError(null); // 에러 초기화
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
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
          disabled={selectedFiles.length >= 5} // 5장 이상 업로드 방지
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* 선택한 파일 미리보기 */}
      <div className="grid grid-cols-3 gap-2">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="relative w-20 h-20 border border-gray-300 rounded overflow-hidden"
          >
            <Image
              width={80}
              height={80}
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
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
