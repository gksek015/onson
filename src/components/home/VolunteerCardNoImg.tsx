'use client';

import type { PostType } from '@/types/PostType';
import dayjs from 'dayjs';
import Link from 'next/link';
import { MapPinIcon } from '../icons/Icons';

interface VolunteerCardProps {
  post: PostType;
}

const VolunteerCardNoImg = ({ post }: VolunteerCardProps) => {
  const formattedStart = dayjs(post.date).format('YY.MM.DD.');
  const formattedEnd = dayjs(post.end_date).format('YY.MM.DD.');

  return (
    <div className="flex min-w-[300px] flex-col items-start self-stretch border-r border-[#e7e7e7] px-[20px] py-[32px]">
      <Link href={`/detail/${post.id}/?from=list`} className="w-full">
        {/* 태그 */}
        <div className="mb-[8px] flex w-full flex-wrap items-center gap-[8px] text-sm font-normal">
          {post.completed ? (
            <span className="flex items-center justify-center gap-2 rounded-full border bg-[#808080] px-2.5 py-0.5 text-sm text-white">
              모집 완료
            </span>
          ) : (
            <span className="hidden"></span>
          )}
          <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]">
            {post.category}
          </span>
          <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]">
            {`${formattedStart}~${formattedEnd}`}
          </span>
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-2">
          <div className="flex flex-1 flex-col items-start gap-[8px]">
            {/* 제목 */}
            <div className="tracking-custom w-[250px] truncate text-lg font-medium leading-7 text-black">
              {post.title}
            </div>
            {/* 주소 */}
            <div className="flex items-center gap-[8px] self-stretch">
              <MapPinIcon />
              <span className="text-sm text-[#4d4d4d]">
                {post.si} {post.gu} {post.dong}
              </span>
            </div>
            {/* 작성자 */}
            <div className="flex items-start gap-[8px] self-stretch text-[13px] text-[#7e7e7e]">
              <span>{post.users.nickname}</span>
              <span>{post.created_at.split('T')[0]}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VolunteerCardNoImg;
