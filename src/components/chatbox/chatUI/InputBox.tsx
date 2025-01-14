'use client';

import { useState } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';

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
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 rounded-full border-2 bg-white px-2 py-1">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="메시지를 입력해주세요"
        className="flex-1 indent-2 outline-none"
      />
      {/* 전송 버튼 */}
      <button type="submit" className="flex items-center justify-center rounded-full bg-slate-100 p-2">
        <IoPaperPlaneOutline />
      </button>
    </form>
  );
};

export default InputBox;
