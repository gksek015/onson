'use client';

import { SendMessageGradientIcon, SendMessageIcon } from '@/components/icons/Icons';

const InputField = ({
  input,
  setInput,
  handleSendMessage,
  handleKeyEnter
}: {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => (
  <footer className="sticky bottom-2 p-4">
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
        <div className="mr-1">
          <button className="flex items-center justify-center p-2" onClick={handleSendMessage}>
            {input.trim() ? <SendMessageGradientIcon /> : <SendMessageIcon />}
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default InputField;
