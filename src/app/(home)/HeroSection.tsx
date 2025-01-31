'use client';

import banner from '@/assets/Frame.png';
import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import useModal from '@/hooks/ui/useModal';
import Image from 'next/image';

const HeroSection = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className='cursor-pointer'>
      <Image src={banner} alt="hero section image" onClick={openModal} priority />

      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </div>
  );
};

export default HeroSection;
