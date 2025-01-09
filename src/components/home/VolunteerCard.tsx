'use client';

import Image from 'next/image';
import { PostType } from '@/api/getPosts';
import Link from 'next/link';

interface VolunteerCardProps {
  post: PostType;
}

const VolunteerCard = ({ post }: VolunteerCardProps) => {


  // console.log(post);
  return (
    <Link href={`/detail/${post.id}`}>
      <div className="flex items-center pt-3">
        <div className="max-w-content border mx-auto rounded-lg">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-gray-400 text-white text-xs rounded-full">{post.category}</span>
                <span className="px-3 py-1 bg-gray-400 text-white text-xs rounded-full">{post.date}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">{post.users.nickname}</span>
                <span>{post.created_at.split('T')[0]}</span>
              </div>
              <div className="md:w-1/2 flex flex-col items-center w-64 mt-6">
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
