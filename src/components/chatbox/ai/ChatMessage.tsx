'use client';

import Image from 'next/image';
import onson from '@/assets/onson.png';

interface Message {
  role: 'user' | 'assistant';
  text?: string;
}

const ChatMessage = ({ msg }: { msg: Message }) => (
  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    {msg.role !== 'user' && <Image src={onson} alt="Onson 프로필 이미지" className="mr-2 h-8 w-8 rounded-full" />}
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
);

export default ChatMessage;
