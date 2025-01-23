'use client';

import dayjs from 'dayjs';

interface PostTagsProps {
  category: string;
  startDate: string;
  endDate: string;
  isPostClosed: boolean;
}

const PostTags = ({ category, startDate, endDate, isPostClosed }: PostTagsProps) => {
  const formattedStart = dayjs(startDate).format('YY.MM.DD.');
  const formattedEnd = dayjs(endDate).format('YY.MM.DD.');

  return (
    <div className="flex flex-wrap items-center gap-[6px] text-[13px] font-normal text-gray-500">
      {/* 모집중/ 마감 태그 */}
      <span className={`rounded-full px-3 py-1 text-white ${isPostClosed ? 'bg-[#A6A6A6]' : 'bg-secondary-1'}`}>
        {isPostClosed ? '모집 마감' : '모집중'}
      </span>

      {/* 날짜(기간) 태그 */}
      <span className="rounded-full bg-secondary-2 px-3 py-1 text-secondary-1 font-medium">
        {formattedStart} ~ {formattedEnd}
      </span>

      {/* 카테고리 태그 */}
      <span className="bg-secondary-2 text-secondary-1 rounded-full px-3 py-1 font-medium">{category}</span>
    </div>
  );
};

export default PostTags;
