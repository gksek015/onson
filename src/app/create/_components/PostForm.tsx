"use client";

import { useState } from "react";
import CategorySelectComp from "./CategorySelectComp";
import PhotoComp from "./PhotoComp";
import DateComp from "./DateComp";

interface PostFormProps {
  categories: string[];
}

const PostForm = ({ categories }: PostFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      selectedCategory,
      selectedRange: selectedRange
        ? `${selectedRange[0].toLocaleDateString("ko-KR")} ~ ${selectedRange[1].toLocaleDateString("ko-KR")}`
        : "기간 선택 안됨",
    });
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
          readOnly
        />
      </div>

      <CategorySelectComp
        categories={categories}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          날짜
        </label>
        <DateComp onSelectRange={(range) => setSelectedRange(range)} />
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
        />
      </div>

      <PhotoComp />

      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        제출하기
      </button>
    </form>
  );
};

export default PostForm;
