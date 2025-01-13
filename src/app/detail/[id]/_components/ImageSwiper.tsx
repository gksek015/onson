'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageSwiperProps {
  images: { img_url: string }[];
}

const ImageSwiper = ({ images }: ImageSwiperProps) => {
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        pagination={{ dynamicBullets: true, clickable: true }} // 페이지네이션 활성화(점으로 표시: 해당 슬라이드는 점 커짐)
        slidesPerView={1} // 한 번에 보여질 슬라이드 개수
      >
        {/* 이미지 사이즈를 업로드 시 가공해서 올릴 지 논의 필요 */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full overflow-hidden pb-[100%]">
              {/* 모바일에서 스크린 가로 너비랑 width 같게함 */}
              <Image
                src={image.img_url}
                alt={`이미지 ${index}`}
                layout="fill" // 부모 컨테이너 크기에 맞게 채움
                objectFit="cover" // 이미지 비율 유지
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
