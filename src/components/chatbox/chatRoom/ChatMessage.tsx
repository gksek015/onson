'use client';

import { useRealTimeMessages } from '@/hooks/useRealTimeMessage';
import { sendMessage } from '@/lib/chats/newMessage';
import { useState } from 'react';

interface ChatMessageProps {
  chatId: string;
  userId: string;
  onBack: () => void;
}

const ChatMessage = ({ chatId, userId, onBack }: ChatMessageProps) => {
  const [input, setInput] = useState('');
  const messages = useRealTimeMessages(chatId);

  const handleSend = async () => {
    if (!input.trim()) return;

    const { error } = await sendMessage(chatId, userId, input.trim());

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    setInput('');
  };

  return (
    <div className="flex h-full flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <button className="text-sm" onClick={onBack}>
          🡸
        </button>
        <h1 className="text-lg font-bold">채팅방</h1>
      </header>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.user_id === userId ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block rounded-lg p-2 ${
                msg.user_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <footer className="border-t p-4">
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-l-lg border p-2 text-black"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
