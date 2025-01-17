'use client';

import { SendMessageGradientIcon, SendMessageIcon } from '@/components/icons/Icons';
import { useRealTimeMessages } from '@/hooks/useRealTimeMessage';
import { sendMessage } from '@/lib/chats/newMessage';
import { useEffect, useRef, useState } from 'react';

interface ChatMessageProps {
  selectedChatId: string;
  userId: string;
  onBackToList: () => void;
}

const ChatMessage = ({ selectedChatId, userId }: ChatMessageProps) => {
  const [input, setInput] = useState('');
  const messages = useRealTimeMessages(selectedChatId);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 메세지가 입력될때 마다 스크롤이 내려가도록 동작하는 로직
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const { error } = await sendMessage(selectedChatId, userId, input.trim());

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    setInput('');
  };

  // 인풋창에 엔터키를 입력해도 메세지가 전송되도록 해주는 이벤트트
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex h-screen flex-col bg-[#F2F2F2] p-4">
      <div className="mb-[14px] flex-1 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.user_id === userId ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block p-2 ${
                msg.user_id === userId
                  ? 'rounded-l-lg rounded-tr-lg bg-[#FB657E] text-white'
                  : 'rounded-b-lg rounded-tr-lg bg-white text-black'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Box */}
      <footer className="sticky bottom-2">
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F99A2C] to-[#FA5571] p-[2px]">
          <div className="flex w-full items-center rounded-full bg-white p-1">
            <input
              type="text"
              className="flex-1 rounded-full p-0.5 text-black focus:outline-none"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyEnter}
            />
            <button className="flex items-center justify-center p-2" onClick={handleSend}>
              {input.trim() ? <SendMessageGradientIcon /> : <SendMessageIcon />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatMessage;
