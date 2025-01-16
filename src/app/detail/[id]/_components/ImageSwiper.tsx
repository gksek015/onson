'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/Icons';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageSwiperProps {
  images: { img_url: string }[];
  isPostClosed: boolean; //모집 마감 했는지 안했는지
}

const ImageSwiper = ({ images, isPostClosed }: ImageSwiperProps) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ dynamicBullets: true, clickable: true }} // 페이지네이션 활성화(점으로 표시: 해당 슬라이드는 점 커짐)
        slidesPerView={1} // 한 번에 보여질 슬라이드 개수
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next'
        }}
        className="custom-swiper-pagination"
      >
        {/* 이미지 사이즈를 업로드 시 가공해서 올릴 지 논의 필요 */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full overflow-hidden pb-[75%]">
              {/* 모바일에서 스크린 가로 너비랑 width 같게함 */}
              <Image
                src={image.img_url}
                alt={`이미지 ${index}`}
                layout="fill" // 부모 컨테이너 크기에 맞게 채움
                objectFit="contain" // 이미지 비율 유지
              />
              {/* 모집 마감 시 회색 오버레이 보여주기*/}
              {isPostClosed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"></div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 Navigation 버튼 */}
      <div className="custom-swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 p-1">
        <ArrowLeftIcon />
      </div>
      <div className="custom-swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 p-1">
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default ImageSwiper;
