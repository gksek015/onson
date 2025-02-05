'use client';

import { useModalStore } from '@/utils/store/useModalStore';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ChatBoxModal from './ChatBoxModal';

const ClientChatModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // 처음엔 null 상태

  useEffect(() => {
    // 브라우저에서 실행될 때만 크기 체크
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    checkScreenSize(); // 최초 실행 시 체크
    window.addEventListener('resize', checkScreenSize); // 화면 크기 변화 감지

    return () => window.removeEventListener('resize', checkScreenSize); // 클린업
  }, []);

  if (isMobile === null) return null; // 초기 렌더링 방지 (깜빡임 해결)

  return isOpen ? (
    isMobile ? (
      <ChatBoxModal onClose={closeModal} /> // 모바일에서는 바로 렌더링
    ) : (
      createPortal(
        <div className="fixed inset-0 z-50">
          <ChatBoxModal onClose={closeModal} />
        </div>,
        document.body
      )
    )
  ) : null;
};

export default ClientChatModal;
