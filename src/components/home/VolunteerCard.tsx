'use client';

import type { PostType } from '@/types/PostType';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '../icons/Icons';

interface VolunteerCardProps {
  post: PostType;
}

const VolunteerCard = ({ post }: VolunteerCardProps) => {
  let firstImg = null;
  if (post.images && post.images.length > 0) {
    firstImg = post.images[0].img_url;
  }

  const formattedStart = dayjs(post.date).format('YY.MM.DD.');
  const formattedEnd = dayjs(post.end_date).format('YY.MM.DD.');

  return (
    <div className="flex w-full flex-row items-start gap-3.5 self-stretch border-b border-[#e7e7e7] px-5 py-8">
      <Link href={`/detail/${post.id}`} className="w-full">
        {/* 태그 */}
        <div className="mb-[8px] flex w-full flex-wrap items-center gap-[8px] text-sm font-normal">
          {post.completed ? (
            <span className="flex items-center justify-center gap-2 rounded-full border bg-[#808080] px-2.5 py-0.5 text-sm text-white">
              모집 마감
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
            <div className="tracking-custom text-lg font-medium leading-7 text-black">{post.title}</div>
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

          {/* 이미지 */}
          {firstImg && (
            <div className="relative flex h-20 w-20 items-center self-end">
              <Image src={firstImg} alt={post.title} width={100} height={100} className="h-full w-full object-cover" />
              {post.completed && (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                  <div className="inline-flex rounded-md bg-white bg-opacity-20 px-2.5 py-1">
                    <span className="text-xs font-medium text-white">모집마감</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default VolunteerCard;
