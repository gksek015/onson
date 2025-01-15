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
    <Link href={`/detail/${post.id}`}>
      <div className="flex items-center pt-3">
        <div className="mx-auto max-w-content rounded-lg border">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-gray-400 px-3 py-1 text-xs text-white">{post.category}</span>
                <span className="rounded-full bg-gray-400 px-3 py-1 text-xs text-white">{post.date}</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold">
                [ {post.si} {post.gu} {post.dong} ]
              </h3>
              <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">{post.users.nickname}</span>
                <span>{post.created_at.split('T')[0]}</span>
              </div>
              <div className="mt-6 flex w-64 flex-col items-center md:w-1/2">
                {firstImg && (
                  <Image src={firstImg} alt={post.title} width={800} height={500} className="object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VolunteerCard;
