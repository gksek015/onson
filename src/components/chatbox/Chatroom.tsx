import InputBox from './chatUI/InputBox';
import Message from './chatUI/Message';

// 채팅방

const Chatroom = () => {
  return (
    <div className="h-full flex flex-col">
      {/* 메세지 리스트 */}
      <div className="flex-1 overflow-y-auto p-4">
        <Message />
      </div>

      {/* 입력창 */}
      <div>
        <InputBox />
      </div>
    </div>
  );
};

export default Chatroom;