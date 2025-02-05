'use client';

import {
  MessageDesktopCircleIcon,
  MessageDesktopHoverAlertIcon,
  MessageDesktopHoverIcon,
  MessageDesktopStrokeIcon
} from '@/components/icons/Icons';
import { useModalStore } from '@/utils/store/useModalStore';
import { useUserStore } from '@/utils/store/userStore';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
import { useEffect, useState } from 'react';

const ChatIcon = () => {
  const { unreadMessages, subscribeToRealtimeMessages, refetch } = useUnreadMessageStore();
  const { openModal } = useModalStore();
  const { user } = useUserStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && user?.id) {
      refetch(user.id);
      subscribeToRealtimeMessages(user.id);
    }
  }, [user?.id]);

  const hasUnreadMessages = Object.values(unreadMessages).some((val) => val);

  return (
    <div className="relative mobile:hidden desktop:block">
      <button onClick={openModal} className="relative">
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
    </div>
  );
};

export default ChatIcon;
