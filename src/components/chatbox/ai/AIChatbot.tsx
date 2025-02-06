'use client';

import { useGetFilteredPosts } from '@/hooks/useGetFilteredPosts';
import { useEffect, useRef, useState } from 'react';
import AddressSelector from './AddressSelector';
import CategorySelector from './CategorySelector';
import DateSelector from './DateSelector';
import { OnsonLoading } from './OnsonLoading';
import RecommendationList from './RecommendationList';
import InputField from './InputField';
import { RecommendedPost } from '@/types/RecommendedPost';
import ChatMessage from './ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  text?: string;
  type?: 'text' | 'recommendation';
  posts?: RecommendedPost[];
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [waitingForInput, setWaitingForInput] = useState<{ step: string } | null>(null);
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const filters = {
    location,
    date: dateRange ? dateRange.map((d) => d.toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '')) : [],
    categories
  };

  const filteredPosts = useGetFilteredPosts(filters);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: scrollableDivRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const options = [
    '온손 웹사이트가 궁금해요!',
    '봉사 요청을 어떻게 하는지 궁금해요!',
    '봉사를 어떻게 검색하는지 궁금해요!',
    '사용자와 채팅은 어떻게 해야하는지 궁금해요!',
    '봉사 참여는 어떻게 해야 하는지 알려줘!',
    '내가 신청한 봉사는 어떻게 확인해야 하는지 알려줘!'
  ];

  const handleOptionClick = async (option: string) => {
    if (waitingForInput) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: '🙂 봉사게시글글 추천 받기를 중단했습니다. 나를 위한 봉사 게시물 찾기를 원하시면, 다시 상단에서 해당 옵션을 선택해주세요.' }
      ]);
      setWaitingForInput(null);
    }

    await sendMessage(option);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (waitingForInput) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '🙂 봉사게시글글 추천 받기를 중단했습니다. 나를 위한 봉사 게시물 찾기를 원하시면, 다시 상단에서 해당 옵션을 선택해주세요.'
        }
      ]);
      setWaitingForInput(null);
    }

    await sendMessage(input);
    setInput('');
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setMessages((prev) => [...prev, { role: 'user', text: `📍 선택한 위치: ${selectedLocation}` }]);
    setMessages((prev) => [...prev, { role: 'assistant', text: '📅 봉사 희망 날짜를 선택하세요.' }]);
    setWaitingForInput({ step: 'date' });
  };

  const handleDateSelect = (range: [Date, Date]) => {
    setDateRange(range);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: `📅 봉사 희망 날짜: ${range[0].toLocaleDateString()} ~ ${range[1].toLocaleDateString()}` }
    ]);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: '🏷️ 어떤 종류의 봉사를 원하시나요? (여러 개 선택 가능)' }
    ]);
    setWaitingForInput({ step: 'category' });
  };

  const handleCategorySelect = async (selectedCategories: string[]) => {
    setCategories(selectedCategories);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: `🏷️ 선택한 봉사 카테고리: ${selectedCategories.join(', ')}` }
    ]);
    setWaitingForInput(null);

    try {
      setLoading(true);

      const response = await fetch('/api/openAI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: '봉사 추천',
          filters,
          filteredPosts
        })
      });

      if (!response.ok) throw new Error('응답 받기 실패함');

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.message },
        { role: 'assistant', type: 'recommendation', posts: data.recommendedPosts }
      ]);
    } catch (error) {
      console.error('API 요청 실패:', error);
      setMessages((prev) => [...prev, { role: 'assistant', text: '봉사 추천을 가져오는 데 실패했습니다.' }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setLoading(true);

    try {
      if (message === '나를 위한 봉사 게시글 추천해줘!') {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: '📍 어느 지역에서 봉사를 하고 싶나요? 예시: 서울특별시 관악구 신림동 등'
          }
        ]);
        return setWaitingForInput({ step: 'location' });
      }

      const response = await fetch('/api/openAI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: message })
      });

      if (!response.ok) throw new Error('응답 받기 실패함');

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
            {messages.map((msg, index) =>
              msg.type === 'recommendation' && msg.posts && msg.posts.length > 0 ? (
                <RecommendationList posts={msg.posts} />
              ) : (
                <ChatMessage msg={msg} index={index} />
              )
            )}
            {loading && (
              <div className="mt-4 text-center">
                <OnsonLoading />
              </div>
            )}
            {waitingForInput?.step === 'location' && <AddressSelector onSelect={handleLocationSelect} />}
            {waitingForInput?.step === 'date' && <DateSelector onSelectRange={handleDateSelect} />}
            {waitingForInput?.step === 'category' && <CategorySelector onSelect={handleCategorySelect} />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      {/* 입력창 */}
      <InputField
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        handleKeyEnter={handleKeyEnter}
      />
    </div>
  );
};

export default AIChatbot;


