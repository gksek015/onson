import { useEffect, useState } from "react";
import { create } from "zustand";

interface GNBState {
  activeTab: 'home' | 'create' | 'list' | 'chat';
  setActiveTab: (tab: 'home' | 'create' | 'list' | 'chat') => void;

}

// Zustand Store 생성
export const useGNBStore = create<GNBState>((set) => ({
  activeTab: 'home',
  isGNBVisible: true,
  setActiveTab: (tab) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", tab);
    }
    set({ activeTab: tab });
  },
  
}));

// 클라이언트에서 localStorage 값을 업데이트하는 Hook
export const useSyncGNBStore = () => {
  const setActiveTab = useGNBStore((state) => state.setActiveTab);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTab = localStorage.getItem("activeTab") as 'home' | 'create' | 'list' | 'chat' | null;
    
    if (storedTab) {
      setActiveTab(storedTab);
    } else {
      setActiveTab('home');
    }
  
    setIsInitialized(true);
  }, [setActiveTab]);

  return isInitialized;
};
