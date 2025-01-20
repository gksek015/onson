import { useState } from 'react';
import AIChatbot from './AIChatbot';
import AIInitial from './AIInitial';

const AIChatroom = () => {
  const [showChatbot, setShowChatbot] = useState(false);  

  const handleChatbotToggle = () => {
    setShowChatbot((prev) => !prev); 
  };

  return (
    <>

      {showChatbot ? (
        <AIChatbot /> 
      ) : (
        <AIInitial onChatStart={handleChatbotToggle} /> 
      )}
    </>
  );
};

export default AIChatroom;
