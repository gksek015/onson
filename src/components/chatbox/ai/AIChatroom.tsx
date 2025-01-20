import { useState } from 'react';
import AIChatbot from './AIChatbot';
import AIInitial from './AIInitial';
interface AIChatroomProps {
  onChatbotToggle: (isVisible: boolean) => void;
}

const AIChatroom = ({ onChatbotToggle }: AIChatroomProps) => {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatbotToggle = () => {
    const newState = !showChatbot;
    setShowChatbot(newState);
    onChatbotToggle(newState); // 부모 컴포넌트에 상태 전달
  };

  return <>{showChatbot ? <AIChatbot /> : <AIInitial onChatStart={handleChatbotToggle} />}</>;
};

export default AIChatroom;
