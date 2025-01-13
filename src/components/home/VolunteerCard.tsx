'use client';

import Image from 'next/image';
// import React, { useEffect } from 'react';
// import oldman2 from '@/assets/oldman2.jpg';
import { PostType } from '@/types/PostType';
import Link from 'next/link';

interface VolunteerCardProps {
  post: PostType;
}

const VolunteerCard = ({ post }: VolunteerCardProps) => {
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
              <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">{post.users.nickname}</span>
                <span>{post.created_at.split('T')[0]}</span>
              </div>
              <div className="mt-6 flex w-64 flex-col items-center md:w-1/2">
                {post.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image?.img_url}
                    alt={post.title}
                    width={800}
                    height={500}
                    className="object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VolunteerCard;
