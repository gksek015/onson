'use client';

import { useModalStore } from '@/utils/store/useModalStore';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ChatBoxModal from './ChatBoxModal';

const ClientChatModal = () => {
  const { isOpen, closeModal, selectedChatId } = useModalStore();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [currentChatId, setCurrentChatId] = useState(selectedChatId);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setCurrentChatId(selectedChatId);
  }, [selectedChatId]);

  if (!isOpen || isMobile === null) return null;

  return isOpen ? (
    isMobile ? (
      <ChatBoxModal onClose={closeModal} key={currentChatId} />
    ) : (
      createPortal(
        <div className="fixed inset-0 z-50">
          <ChatBoxModal onClose={closeModal} key={currentChatId} />
        </div>,
        document.body
      )
    )
  ) : null;
};

export default ClientChatModal;
