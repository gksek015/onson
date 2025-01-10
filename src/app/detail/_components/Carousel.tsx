'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  images: { img_url: string }[];
}

const Carousel = ({ images }: CarouselProps) => {
  return (
    <div className="h-64 w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Swiper 모듈 설정
        navigation // 네비게이션 화살표 활성화
        pagination={{ clickable: true }} // 페이지네이션 활성화
        // autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 재생 활성화
        // loop // 무한 반복
        // spaceBetween={20} // 슬라이드 간격
        slidesPerView={1} // 한 번에 보여질 슬라이드 개수
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 w-full">
              <Image
                src={image.img_url}
                alt={`이미지 ${index}`}
                layout="fill" // 부모 컨테이너 크기에 맞게 채움
                objectFit="cover" // 이미지 비율 유지
                className="rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
