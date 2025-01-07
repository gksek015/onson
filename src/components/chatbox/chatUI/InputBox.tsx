'use client';

import { useState } from 'react';

// 메세지 입력창

const InputBox = () => {
  const [inputValue, setInputValue] = useState(''); //입력값 관리

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // TODO: 메시지를 전송하는 로직 필요함
    //(로직은 ai와 실시간 채팅 부분이 달라질 듯해요)
    console.log('메시지 전송한 거 확인:', inputValue);

    setInputValue(''); //초기화
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white rounded-full px-2 py-1 border-2 ">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="메시지를 입력해주세요"
        className="flex-1 outline-none indent-2"
      />
      {/* 전송 버튼 */}
      <button
        type="submit"
        className="p-2 bg-slate-100 rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-send"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default InputBox;
