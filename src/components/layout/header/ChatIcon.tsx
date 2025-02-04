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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleModal();
  };

  return (
    <div className="mobile:hidden desktop:block">
      <button onClick={handleClick}>
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
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </div>
  );
};

export default ChatIcon;
