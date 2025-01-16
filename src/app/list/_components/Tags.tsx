'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Tags = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.get('category'));
  const [keyword, setKeyword] = useState(searchParams.get('searchedKeyword'));

  // URL 파라미터 값이 바뀌면 상태와 동기화
  useEffect(() => {
    setCategory(searchParams.get('category'));
    setKeyword(searchParams.get('searchedKeyword'));
  }, [searchParams]); // searchParams가 변경될 때마다 실행

  // 'category' 파라미터 제거
  const removeCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    router.push(`?${params.toString()}`);
  };

  // 'keyword'파라미터 제거
  const removeKeyword = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('searchedKeyword');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-start gap-1 text-xs">
      {/* category 태그 */}
      {category && (
        <div className="flex rounded-lg border p-1.5">
          {category}
          <button
            className="ml-3"
            onClick={(e) => {
              e.stopPropagation();
              removeCategory();
            }}
          >
            X
          </button>
        </div>
      )}

      {/* keyword 태그 */}
      {keyword && (
        <div className="flex rounded-lg border p-1.5">
          {keyword}
          <button
            className="ml-3"
            onClick={(e) => {
              e.stopPropagation();
              removeKeyword();
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
