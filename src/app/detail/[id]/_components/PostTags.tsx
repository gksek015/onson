'use client';

interface PostTagsProps {
  category: string;
  startDate: string;
  endDate: string;
  isPostClosed: boolean;
}

const PostTags = ({ category, startDate, endDate, isPostClosed }: PostTagsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-[6px] text-[13px] font-normal text-gray-500">
      {/* 모집중/ 마감 태그 */}
      <span className={`rounded-full px-3 py-1 text-white ${isPostClosed ? 'bg-gray-500' : 'bg-secondary-1'}`}>
        {isPostClosed ? '모집 마감' : '모집중'}
      </span>

      {/* 날짜(기간) 태그 */}
      <span className="rounded-full border-[1px] border-secondary-1 px-3 py-1 text-secondary-1">
        {startDate} ~ {endDate}
      </span>

      {/* 카테고리 태그 */}
      <span className="rounded-full border-[1px] border-secondary-1 px-3 py-1 text-secondary-1">{category}</span>
    </div>
  );
};

export default PostTags;
