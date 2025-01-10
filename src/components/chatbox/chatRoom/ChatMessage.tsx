'use client';

import { useState } from 'react';

interface Message {
  user_id: string;
  content: string;
}

interface ChatMessageProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const ChatMessage = ({ messages, onSendMessage, onBack }: ChatMessageProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <button className="text-sm" onClick={onBack}>
          ← 뒤로
        </button>
        <h1 className="text-lg font-bold">채팅방</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.user_id === 'currentUserId' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block rounded-lg p-2 ${
                msg.user_id === 'currentUserId' ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <footer className="border-t p-4">
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-l-lg border p-2"
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="rounded-r-lg bg-blue-500 p-2 text-white" onClick={handleSend}>
            전송
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatMessage;
