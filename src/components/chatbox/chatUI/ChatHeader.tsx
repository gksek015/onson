'use client';

import { getChatUserNickname } from '@/hooks/getChatNickname';
import { useEffect, useState } from 'react';

interface ChatHeaderProps {
  chatId: string;
  currentUserId: string;
  onClose: () => void;
  onBack: () => void;
}

const ChatHeader = ({ chatId, currentUserId, onClose, onBack }: ChatHeaderProps) => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      const otherNickname = await getChatUserNickname(chatId, currentUserId);
      setNickname(otherNickname);
    };

    fetchNickname();
  }, [chatId, currentUserId]);

  return (
    <div className="flex items-center justify-between border-b p-8 text-black">
      <button onClick={onBack} className="left-4 text-xl text-black">
        🡸
      </button>
      <h1 className="left-0 right-0 text-center text-lg font-bold">{nickname || '로딩중..'}</h1>
      <button onClick={onClose} className="right-4 text-xl">
        ✖️
      </button>
    </div>
  );
};

export default ChatHeader;
