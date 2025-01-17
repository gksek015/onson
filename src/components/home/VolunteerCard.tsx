'use client';

import type { PostType } from '@/types/PostType';
import Image from 'next/image';
import Link from 'next/link';

interface VolunteerCardProps {
  post: PostType;
}

const VolunteerCard = ({ post }: VolunteerCardProps) => {
  let firstImg = null;
  if (post.images && post.images.length > 0) {
    firstImg = post.images[0].img_url;
  }

  return (
    <div className="flex w-full flex-row items-start gap-3.5 self-stretch border-b border-[#e7e7e7] px-5 py-8">
      <Link href={`/detail/${post.id}`} className="w-full">
        {/* Tags */}
        <div className="mb-2 flex w-full gap-2">
          <span className="shadow-tags flex items-center justify-center gap-2 rounded-lg bg-white px-2.5 py-0.5 text-sm text-[#656565]">
            {post.category}
          </span>
          <span className="shadow-tags flex items-center justify-center gap-2 rounded-lg bg-white px-2.5 py-0.5 text-sm text-[#656565]">
            {`${post.date}~${post.end_date}`}
          </span>
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-2">
          <div className="flex flex-1 flex-col items-start gap-2">
            {/* Title */}
            <div className="tracking-custom text-lg font-medium leading-7 text-black">{post.title}</div>
            {/* Location */}
            <div className="flex items-center gap-2 self-stretch">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.49992 9.16665C7.49992 9.82969 7.76331 10.4656 8.23215 10.9344C8.70099 11.4033 9.33688 11.6666 9.99992 11.6666C10.663 11.6666 11.2988 11.4033 11.7677 10.9344C12.2365 10.4656 12.4999 9.82969 12.4999 9.16665C12.4999 8.5036 12.2365 7.86772 11.7677 7.39888C11.2988 6.93004 10.663 6.66665 9.99992 6.66665C9.33688 6.66665 8.70099 6.93004 8.23215 7.39888C7.76331 7.86772 7.49992 8.5036 7.49992 9.16665Z"
                  stroke="#818181"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.7141 13.8808L11.1783 17.4166C10.8657 17.7288 10.4421 17.9042 10.0003 17.9042C9.5586 17.9042 9.13493 17.7288 8.82242 17.4166L5.28576 13.8808C4.35344 12.9484 3.71853 11.7605 3.46133 10.4673C3.20412 9.17413 3.33616 7.8337 3.84076 6.61555C4.34535 5.39739 5.19984 4.35622 6.29616 3.6237C7.39248 2.89117 8.68139 2.50018 9.99992 2.50018C11.3184 2.50018 12.6074 2.89117 13.7037 3.6237C14.8 4.35622 15.6545 5.39739 16.1591 6.61555C16.6637 7.8337 16.7957 9.17413 16.5385 10.4673C16.2813 11.7605 15.6464 12.9484 14.7141 13.8808Z"
                  stroke="#818181"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-sm text-[#4d4d4d]">
                {post.si} {post.gu} {post.dong}
              </span>
            </div>
            {/* Author */}
            <div className="flex items-start gap-3 self-stretch text-sm text-[#7e7e7e]">
              <span>{post.users.nickname}</span>
              <span>{post.created_at.split('T')[0]}</span>
            </div>
          </div>
          {firstImg && (
            <div className="flex h-24 w-20 items-center ">
              <Image src={firstImg} alt={post.title} width={100} height={100} className='object-cover w-full h-full'/>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default VolunteerCard;
