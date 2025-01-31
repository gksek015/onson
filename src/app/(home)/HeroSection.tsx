'use client';

import banner from '@/assets/Frame.png';
import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import useModal from '@/hooks/ui/useModal';
import { useGNBStore } from '@/utils/store/useGNBStore';
import Image from 'next/image';

const HeroSection = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { setActiveTab } = useGNBStore();

  const handleChatOpen = () => {
    setActiveTab('chat');
    openModal();
  };

  return (
    <div className="md:ml-56">
      <Image src={banner} alt="hero section image" onClick={handleChatOpen} priority className="cursor-pointer" />
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </div>
  );
};

export default HeroSection;
