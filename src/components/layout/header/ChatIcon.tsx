'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import {
  MessageDesktopCircleIcon,
  MessageDesktopHoverAlertIcon,
  MessageDesktopHoverIcon,
  MessageDesktopStrokeIcon
} from '@/components/icons/Icons';
import useModal from '@/hooks/ui/useModal';
import { useUserStore } from '@/utils/store/userStore';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ChatIcon = () => {
  const { unreadMessages, subscribeToRealtimeMessages, refetch } = useUnreadMessageStore();
  const { isOpen, toggleModal, closeModal } = useModal();
  const { user } = useUserStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && user?.id) {
      refetch(user.id);
      subscribeToRealtimeMessages(user.id);
    }
  }, [user?.id]);

  const hasUnreadMessages = Object.values(unreadMessages).some((val) => val);

  const handleClick = () => {
    toggleModal();
  };

  return (
    <div className="relative mobile:hidden desktop:block">
      <button onClick={handleClick} className="relative">
        <span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {isHovered ? (
            hasUnreadMessages ? (
              <MessageDesktopHoverAlertIcon />
            ) : (
              <MessageDesktopHoverIcon />
            )
          ) : hasUnreadMessages ? (
            <MessageDesktopCircleIcon />
          ) : (
            <MessageDesktopStrokeIcon />
          )}
        </span>
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50">
            <ChatBoxModal onClose={closeModal} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default ChatIcon;
