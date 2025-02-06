import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  selectedChatId: string | null;
  activeTab: string;
  showGNB: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setActiveTab: (tab: string) => void;
  setSelectedChatId: (chatId: string | null) => void;
  setShowGNB: (value: boolean) => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedChatId: null,
  activeTab: '온손 AI', 
  showGNB:false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedChatId: null, showGNB: false }), 
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
  setShowGNB: (value) => set({ showGNB: value }), 
}));
