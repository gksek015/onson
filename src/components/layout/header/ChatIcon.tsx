'use client';

import ChatBoxModal from '@/components/chatbox/ChatBoxModal';
import { MessageCircleIcon, MessageStrokeIcon } from '@/components/icons/Icons';
import useModal from '@/hooks/ui/useModal';
import { useUserStore } from '@/utils/store/userStore';
import { useUnreadMessageStore } from '@/utils/store/useUnreadMessageStore';
import { useEffect } from 'react';

const ChatIcon = () => {
  const { unreadMessages, subscribeToRealtimeMessages, refetch } = useUnreadMessageStore();
  const { isOpen, toggleModal, closeModal } = useModal();
  const { user } = useUserStore();

  useEffect(() => {
    if (typeof window !== 'undefined' && user?.id) {
      refetch(user.id);
      subscribeToRealtimeMessages(user.id);
    }
  }, [user?.id]);

  const hasUnreadMessages = Object.values(unreadMessages).some((val) => val);

  const getChatIcon = () => (hasUnreadMessages ? <MessageCircleIcon /> : <MessageStrokeIcon />);

  return (
    <div className="mobile:hidden desktop:block">
      <button onClick={toggleModal}>{getChatIcon()}</button>
      {isOpen && <ChatBoxModal onClose={closeModal} />}
    </div>
  );
};

export default ChatIcon;
