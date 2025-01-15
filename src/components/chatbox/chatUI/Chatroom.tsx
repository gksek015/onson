import InputBox from './InputBox';
import Message from './Message';

// 채팅방

const Chatroom = () => {
  return (
    <div className="flex h-full flex-col">
      {/* 메세지 리스트 */}
      <div className="flex-1 overflow-y-auto p-4">
        <Message />
      </div>

      {/* 입력창 */}
      <InputBox />
    </div>
  );
};

export default Chatroom;
