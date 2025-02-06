'use client';

import { SendMessageGradientIcon, SendMessageIcon } from '@/components/icons/Icons';
import { useRealTimeMessages } from '@/hooks/useRealTimeMessage';
import { sendMessage } from '@/lib/chats/newMessage';
import { useModalStore } from '@/utils/store/useModalStore';
import { useEffect, useRef, useState } from 'react';

interface ChatMessageProps {
  selectedChatId: string;
  userId: string;
  onBackToList: () => void;
}

const ChatMessage = ({ selectedChatId, userId }: ChatMessageProps) => {
  const { setActiveTab } = useModalStore();
  const [input, setInput] = useState('');
  const messages = useRealTimeMessages(selectedChatId);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 메시지가 입력될 때 스크롤을 자동으로 내려주는 로직
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // 메세지를 전송하기 위한 함수
  const handleSend = async () => {
    if (!input.trim()) return;

    const { data, error } = await sendMessage(selectedChatId, userId, input.trim());

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    if (data) {
      setInput('');
    }
  };

  // 인풋창에 엔터키를 입력해도 메시지가 전송되도록 하는 이벤트
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    setActiveTab('실시간 채팅');
  }, [setActiveTab]);

  return (
    <div className="flex h-full flex-col bg-[#F2F2F2]">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-[#F2F2F2] p-4">
        <div className="mx-auto mt-2 w-full max-w-md">
          {/* 공지사항 영역 */}
          <div className="bg-[#F2F2F2]">
            <div className="top-4 z-10 mb-2 rounded-lg bg-white p-2 text-center text-sm font-light text-[#656565]">
              이제부터 봉사는 쉽고 빠르게, 온손과 함께하세요
            </div>
          </div>

          {/* 채팅 메시지 영역 */}
          <div id="chat-container" className="flex-1">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.user_id === userId ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block max-w-[80%] break-words px-[18px] py-2 leading-6 ${
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
        </div>
      </div>

      {/* 메세지 입력 Input */}
      <div className="sticky bottom-2 bg-[#F2F2F2] p-4">
        <footer className="mt-2 desktop:bottom-2">
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F99A2C] to-[#FA5571] p-[2px]">
            <div className="flex w-full items-center rounded-full bg-white">
              <input
                type="text"
                className="flex-1 rounded-full indent-4 text-base text-black focus:outline-none"
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
    </div>
  );
};

export default ChatMessage;
