'use client';

import banner from '@/assets/Frame.png';
import onson from '@/assets/onson.png';
import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import useModal from '@/hooks/ui/useModal';
import { useGNBStore } from '@/utils/store/useGNBStore';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HeroSection = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { setActiveTab } = useGNBStore();

  const handleChatOpen = () => {
    setActiveTab('chat');
    openModal();
  };

  return (
    <div className="md:ml-56">
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
        <SwiperSlide>
          <Image src={banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={onson} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer" />
        </SwiperSlide>
      </Swiper>
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </div>
  );
};

export default HeroSection;
