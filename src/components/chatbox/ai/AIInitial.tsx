'use client';

import { RightArrowForChatIcon } from '@/components/icons/Icons';

interface AIInitialProps {
  onChatStart: () => void; 
}

const AIInitial= ({ onChatStart }: AIInitialProps) => {
  return (
    <div>
      <div className="w-full bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-700">온손이</div>
          <RightArrowForChatIcon />
        </div>

        <p className="my-4 text-lg font-semibold">안녕하세요! 온손AI입니다.</p>
        <p className="text-lg">더 나은 봉사 경험을 위해 질문이 있으시면 온손이와 대화해 보세요!</p>

        <button
          onClick={onChatStart} 
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-5 text-lg font-bold text-white"
        >
          온손이와 대화하기
        </button>
      </div>
    </div>
  );
};

export default AIInitial;
