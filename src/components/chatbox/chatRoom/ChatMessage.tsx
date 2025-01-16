'use client';

import { SendMessageIcon } from '@/components/icons/Icons';
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
    <div className="flex h-screen flex-col">
      <div className="mb-20 flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.user_id === userId ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block rounded-lg p-2 ${
                msg.user_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Box */}
      <footer className="sticky bottom-0 bg-white p-4">
        <div className="flex items-center gap-2 rounded-full border-2 p-2">
          <input
            type="text"
            className="flex-1 rounded-lg p-2 text-black focus:outline-none"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyEnter}
          />
          <button className="flex items-center justify-center p-2" onClick={handleSend}>
            <SendMessageIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatMessage;
