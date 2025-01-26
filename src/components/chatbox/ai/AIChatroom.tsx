import useChatbotStore from '@/utils/store/useChatBotStore';
import AIChatbot from './AIChatbot';
import AIInitial from './AIInitial';
interface AIChatroomProps {
  onChatbotToggle: (isVisible: boolean) => void;
}

const AIChatroom = ({ onChatbotToggle }: AIChatroomProps) => {
  const { showChatbot, setShowChatbot } = useChatbotStore();

  const handleChatbotToggle = () => {
    const newState = !showChatbot;
    setShowChatbot(newState);
    onChatbotToggle(newState);
  };

  return <>{showChatbot ? <AIChatbot /> : <AIInitial onChatStart={handleChatbotToggle} />}</>;
};

export default AIChatroom;
