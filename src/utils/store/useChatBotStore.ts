import { create } from 'zustand';

interface ChatbotStore {
  isChatbotVisible: boolean;
  showChatbot: boolean;
  setIsChatbotVisible: (visible: boolean) => void;
  setShowChatbot: (show: boolean) => void;
}

const useChatbotStore = create<ChatbotStore>((set) => ({
  isChatbotVisible: false,
  showChatbot: false,
  setIsChatbotVisible: (visible) => set({ isChatbotVisible: visible }),
  setShowChatbot: (show) => set({ showChatbot: show }),
}));

export default useChatbotStore;
