"use client";

import Image from "next/image";
import banner from '@/assets/Banner-3.png';
import ChatBoxModal from "@/components/chatbox/ChatBoxModal";
import useModal from "@/hooks/ui/useModal";

const HeroSection = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Image
        src={banner}
        alt="hero section image"
        onClick={openModal}
      />

      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </div>
  );
};

export default HeroSection;
