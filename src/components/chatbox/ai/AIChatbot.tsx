'use client';

import onson from '@/assets/onson.png';
import { SendMessageGradientIcon, SendMessageIcon } from '@/components/icons/Icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { OnsonLoading } from './OnsonLoading';

const AIChatbot = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>(''); // 사용자가 입력하는 텍스트
  const messagesEndRef = useRef<HTMLDivElement>(null); // 메시지 끝을 참조
  const scrollableDivRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: scrollableDivRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // 옵션 리스트
  const options = [
    '온손 웹사이트가 궁금해요!',
    '봉사 요청을 어떻게 하는지 궁금해요!',
    '봉사를 어떻게 검색하는지 궁금해요!',
    '사용자와 채팅은 어떻게 해야하는지 궁금해요!',
    '나를 위한 봉사 게시글 추천해줘!'
  ];

  // 옵션 클릭 시 처리
  const handleOptionClick = async (option: string) => {
    await sendMessage(option);
  };

  // 사용자 입력 전송
  const handleSendMessage = async () => {
    if (!input.trim()) return; // 입력 필드가 비어있으면 실행하지 않음
    await sendMessage(input);
    setInput(''); // 입력 필드 초기화
  };

  // 메시지 전송 로직
  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setLoading(true);

    try {
      const response = await fetch('/api/openAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userMessage: message })
      });

      if (!response.ok) {
        throw new Error('응답 받기 실패함');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.message }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', text: '오류가 발생했습니다. 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME 입력이 완료되지 않은 경우 메시지를 보내지 않음
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#F2F2F2]">
      {/* 채팅창 */}
      <div ref={scrollableDivRef} className="flex-1 overflow-y-auto bg-[#F2F2F2] p-4">
        <div className="mx-auto mt-2 w-full max-w-md">
          {/* 상단 안내 문구 */}
          <div className="mb-2 rounded-lg bg-white p-2 text-center text-sm font-light">
            이제부터 봉사는 쉽고 빠르게, 온손과 함께하세요
          </div>

          <div className="mt-4 rounded-lg rounded-tl-none bg-white p-4 text-sm">
            <div className="text-2xl font-normal">ON:SON</div>
            <div className="mt-2 text-lg font-normal">
              <p>안녕하세요! 온손입니다.</p>
              <p>아래에서 궁금한 사항을 선택하거나</p>
              <p>메시지를 입력해 주세요.</p>
            </div>
          </div>

          {/* 선택할 수 있는 옵션들 */}
          <div className="mt-4 space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="relative block w-full rounded-lg rounded-tl-none bg-gradient-to-r from-[#F99A2C] to-[#FA5571] p-[2px]"
              >
                <span className="block w-full rounded-lg rounded-tl-none bg-white px-4 py-3 text-left text-sm font-medium">
                  {option}
                </span>
              </button>
            ))}
          </div>

          {/* 메세지 부분 */}
          <div className="mt-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role !== 'user' && (
                  <Image src={onson} alt="Onson 프로필 이미지" className="mr-2 h-8 w-8 rounded-full" />
                )}
                <div
                  className={`max-w-xs px-4 py-2 text-sm font-medium ${
                    msg.role === 'user'
                      ? 'rounded-lg rounded-br-none bg-[#FB657E] text-white'
                      : 'rounded-lg rounded-tl-none border border-orange-300 bg-white text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mt-4 text-center">
                <OnsonLoading />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 입력창 */}
      <footer className="sticky bottom-2">
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F99A2C] to-[#FA5571] p-[2px]">
          <div className="flex w-full items-center rounded-full bg-white p-1">
            <input
              type="text"
              className="flex-1 rounded-full indent-4 text-black focus:outline-none"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyEnter}
            />
            <button className="flex items-center justify-center p-2" onClick={handleSendMessage}>
              {input.trim() ? <SendMessageGradientIcon /> : <SendMessageIcon />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIChatbot;
