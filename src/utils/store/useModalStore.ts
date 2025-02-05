import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  selectedChatId: string | null;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setSelectedChatId: (chatId: string | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedChatId: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedChatId: null }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
}));
