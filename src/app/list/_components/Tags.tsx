'use client';

import { CloseIcon } from '@/components/icons/Icons';
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
    <div className="flex items-center justify-start gap-3 text-xs">
      {/* category 태그 */}
      {category && (
        <div className="flex rounded-lg border border-[#e6e6e6] py-1.5 pl-2 pr-1.5">
          <span className="text-sm text-[#656565]">{category}</span>
          <button
            className="ml-3"
            onClick={(e) => {
              e.stopPropagation();
              removeCategory();
            }}
          >
            <CloseIcon width="14px" height="14px" />
          </button>
        </div>
      )}

      {/* keyword 태그 */}
      {keyword && (
        <div className="flex rounded-lg border border-[#e6e6e6] py-1.5 pl-2 pr-1.5">
          <span className="text-sm text-[#656565]">{keyword}</span>
          <button
            className="ml-3"
            onClick={(e) => {
              e.stopPropagation();
              removeKeyword();
            }}
          >
            <CloseIcon width="14px" height="14px" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
