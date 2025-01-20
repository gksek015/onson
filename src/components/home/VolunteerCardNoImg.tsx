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
    <div className="flex min-w-[300px] max-w-[500px] flex-col items-start gap-3.5 self-stretch border-r border-[#e7e7e7] px-5 py-8">
      <Link href={`/detail/${post.id}`} className="w-full">
        {/* 태그 */}
        <div className="mb-2 flex w-full flex-wrap items-center gap-2 text-sm font-normal">
          {post.completed ? (
            <span className="flex items-center justify-center gap-2 rounded-full border bg-[#808080] px-2.5 py-0.5 text-sm text-white">
              모집 완료
            </span>
          ) : (
            <span className="hidden"></span>
          )}
          <span className="flex items-center justify-center gap-2 rounded-full border border-[#FF9214] bg-white px-2.5 py-0.5 text-sm text-[#FF9214]">
            {post.category}
          </span>
          <span className="flex items-center justify-center gap-2 rounded-full border border-[#FF9214] bg-white px-2.5 py-0.5 text-sm text-[#FF9214]">
            {`${formattedStart}~${formattedEnd}`}
          </span>
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-2">
          <div className="flex flex-1 flex-col items-start gap-2">
            {/* 제목 */}
            <div className="tracking-custom text-lg font-medium leading-7 text-black">{post.title}</div>
            {/* 주소 */}
            <div className="flex items-center gap-2 self-stretch">
              <MapPinIcon />
              <span className="text-sm text-[#4d4d4d]">
                {post.si} {post.gu} {post.dong}
              </span>
            </div>
            {/* 작성자 */}
            <div className="flex items-start gap-3 self-stretch text-sm text-[#7e7e7e]">
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
