import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  selectedChatId: string | null;
  openModal: () => void;
  closeModal: () => void;
    toggleModal: () => void;
      activeTab: string;
  setActiveTab: (tab: string) => void;
  setSelectedChatId: (chatId: string | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
    selectedChatId: null,
   activeTab: '온손 AI', 
  setActiveTab: (tab) => set({ activeTab: tab }), 
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedChatId: null }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
}));
