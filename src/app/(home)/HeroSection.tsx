'use client';

import { useState, useEffect } from 'react';
import banner from '@/assets/mob-banner.png';
import mob_banner from '@/assets/공지사항-2.png';
import web_banner from '@/assets/Banner-8.png';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하일 경우 모바일로 판단
    };

    handleResize(); // 초기 실행 시 크기 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatOpen = () => {
    setActiveTab('chat');
    openModal();
  };

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={false}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* 모바일 버전 */}
        {isMobile ? (
          <>
            <SwiperSlide>
              <Image src={banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer " />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={mob_banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer" />
            </SwiperSlide>
          </>
        ) : (
          /* 웹 버전 */
          <>
            <SwiperSlide>
              <Image src={banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer desktop:ml-80" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={web_banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer desktop:mx-auto" />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default HeroSection;
