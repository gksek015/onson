"use client";

import Image from "next/image";
import banner from '@/assets/Banner-3.png';
import ChatBoxModal from "@/components/chatbox/ChatBoxModal";
import useModal from "@/hooks/ui/useModal";

const HeroSection = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Image
        src={banner}
        alt="hero section image"
        onClick={openModal}
        priority
      />

      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </>
  );
};

export default HeroSection;
