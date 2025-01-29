import { create } from "zustand";

interface GNBState {
  activeTab: 'home' | 'create' | 'list' | 'chat';
  setActiveTab: (tab: 'home' | 'create' | 'list' | 'chat') => void;
}
export const useGNBStore = create<GNBState>((set) => ({
    activeTab: 'home',
    setActiveTab: (tab) => set({activeTab:tab})
}))