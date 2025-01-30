'use client';

import type { PostType } from '@/types/PostType';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, MyProfileIcon } from '../icons/Icons';

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

  const isPastEndDate = dayjs(post.end_date).isBefore(dayjs(), 'day'); // 오늘이 end_date 이후인지 확인
  const isCloseToEndDate = dayjs(post.end_date).diff(dayjs(), 'day') <= 2 && !isPastEndDate; // 오늘 기준 이틀 이하 인지 확인

  return (
    <li className="flex w-full flex-row items-start gap-3.5 self-stretch border-b border-[#e7e7e7] px-5 py-8 sm:border-r sm:last:border-r-0 ">
      <Link href={`/detail/${post.id}/?from=list`} className="w-full">
        {/* 태그 */}
        <div className="mb-[8px] flex w-full flex-wrap items-center gap-[8px] text-sm font-normal">
          {post.completed ? (
            <span className="flex items-center justify-center gap-2 rounded-full border bg-[#A6A6A6] px-2.5 py-0.5 text-sm text-white">
              모집 마감
            </span>
          ) : (
            <span className="hidden"></span>
          )}
          {isCloseToEndDate && !post.completed && !isPastEndDate && (
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFEBE5] px-2.5 py-0.5 text-sm text-[#FF0000]">
              마감 임박 봉사
            </span>
          )}
          <span
            className={
              'flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]'
            }
          >
            {post.category}
          </span>
          <span className="flex items-center justify-center gap-2 rounded-full bg-[#FFF5EC] px-2.5 py-0.5 text-sm text-[#FF9214]">
            {`${formattedStart}~${formattedEnd}`}
          </span>
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-2">
          <div className="flex flex-1 flex-col items-start gap-[8px]">
            {/* 제목 */}
            <div className="text-lg font-medium leading-7 tracking-custom text-black">{post.title}</div>
            {/* 주소 */}
            <div className="flex items-center gap-[8px] self-stretch">
              <MapPinIcon />
              <span className="text-sm text-[#4d4d4d]">
                {post.si} {post.gu} {post.dong}
              </span>
            </div>
            {/* 작성자 */}
            <div className="flex items-center gap-2 self-stretch text-sm leading-4 text-[#7e7e7e]">
              {post.users.profile_img_url ? (
                <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src={post.users.profile_img_url}
                    alt={`${post.users.nickname}의 프로필 이미지`}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <MyProfileIcon width="24" height="24" />
              )}
              <span>{post.users.nickname}</span>
              {/* <span>{post.created_at.split('T')[0]}</span> */}
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
    </li>
  );
};

export default VolunteerCard;
