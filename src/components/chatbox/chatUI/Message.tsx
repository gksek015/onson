'use client';

// 메세지 나오는 모양

const Message = () => {
  // 임의로 만든 메세지 내용
  // TODO: 나중에 실시간 채팅, ai 사용해서 메세지 데이터 어떨게 보여줄 지 다시 논의 필요

  const messages = [
    {
      id: 1,
      text: '유기견 봉사 관련 문의드립니다. 혹시 하루 정도 빠지게 되면 어느분께 말씀을 드려야할까요??',
      isUser: true
    },
    {
      id: 2,
      text: '안녕하세요. 지금처럼 실시간 채팅으로 말씀 주시면 됩니다!',
      isUser: false
    }
  ];

  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className={`flex  ${message.isUser ? 'justify-end' : 'justify-start'}`}>
          {/* 나중에 여기에 상대방이면 이름도 추가되어야할 것 같습니다. */}
          <div
            className={`relative w-2/3 p-3 rounded-xl text-sm ${
              message.isUser
                ? 'bg-gray-100 text-black rounded-br-none' // 사용자 메시지
                : 'bg-gray-300 text-black rounded-bl-none' // 상대방 메시지
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
