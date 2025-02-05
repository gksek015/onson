import { useEffect, useState } from "react";
import { create } from "zustand";

interface GNBState {
  activeTab: 'home' | 'create' | 'list' | 'chat';
  prevActiveTab: string | null;
  setActiveTab: (tab: 'home' | 'create' | 'list' | 'chat') => void;
  setPrevActiveTab: (tab:string) => void
}

// Zustand Store 생성
export const useGNBStore = create<GNBState>((set) => ({
  activeTab: 'home',
  prevActiveTab: null,
  isGNBVisible: true,
  setActiveTab: (tab) => {
    if (typeof window !== "undefined") {
      const prevTab = localStorage.getItem("activeTab"); // 이전의 탭 상태를 저장장
      if (prevTab) {
        localStorage.setItem("prevActiveTab", prevTab); // 로컬에 이전 탭 상태를 업데이트트
      }
      localStorage.setItem("activeTab", tab);
    }
    set((state) => ({
      prevActiveTab: state.activeTab,
      activeTab: tab,
    }));
  },
  setPrevActiveTab: (tab) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("prevActiveTab", tab);
    }
    set({ prevActiveTab: tab });
  },
  
}));

// 클라이언트에서 localStorage 값을 업데이트하는 Hook
export const useSyncGNBStore = () => {
  const setActiveTab = useGNBStore((state) => state.setActiveTab);
  const setPrevActiveTab = useGNBStore((state) => state.setPrevActiveTab);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTab = localStorage.getItem("activeTab") as 'home' | 'create' | 'list' | 'chat' | null;
    const storedPrevTab = localStorage.getItem("prevActiveTab");
    
    if (storedTab) {
      setActiveTab(storedTab);
    } else {
      setActiveTab('home');
    }

    if (storedPrevTab) {
      setPrevActiveTab(storedPrevTab);
    }
  
    setIsInitialized(true);
  }, [setActiveTab]);

  return isInitialized;
};
