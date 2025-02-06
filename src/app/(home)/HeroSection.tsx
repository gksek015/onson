'use client';

import banner from '@/assets/mob-banner.png';
import onson from '@/assets/onson-loading.png';
import { useGNBStore } from '@/utils/store/useGNBStore';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useModalStore } from '@/utils/store/useModalStore';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HeroSection = () => {
  const { openModal } = useModalStore();
  const { setActiveTab } = useGNBStore();

  const handleChatOpen = () => {
    setActiveTab('chat');
    openModal();
  };

  return (
    <div className="desktop:ml-80">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* 배너 이미지 슬라이드 */}
        <SwiperSlide>
          <Image src={banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={onson} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
