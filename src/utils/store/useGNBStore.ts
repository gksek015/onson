import { useEffect, useState } from "react";
import { create } from "zustand";

interface GNBState {
  activeTab: 'home' | 'create' | 'list' | 'chat';
  isGNBVisible: boolean;
  setActiveTab: (tab: 'home' | 'create' | 'list' | 'chat') => void;
  setIsGNBVisible: (isVisible: boolean) => void;
}

// Zustand Store 생성
export const useGNBStore = create<GNBState>((set) => ({
  activeTab: 'home', // ✅ 기본값을 'home'으로 설정
  isGNBVisible: true,
  setActiveTab: (tab) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", tab);
    }
    set({ activeTab: tab });
  },
  setIsGNBVisible: (isVisible) => set({ isGNBVisible: isVisible }),
}));

// 클라이언트에서 localStorage 값을 업데이트하는 Hook
export const useSyncGNBStore = () => {
  const setActiveTab = useGNBStore((state) => state.setActiveTab);
  const setIsGNBVisible = useGNBStore((state) => state.setIsGNBVisible);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ 서버에서 실행 방지

   setTimeout(() => {
    const storedTab = localStorage.getItem("activeTab") as 'home' | 'create' | 'list' | 'chat' | null;
    if (storedTab) {
      setActiveTab(storedTab);
    } else {
      setActiveTab('home');
    }
    setIsGNBVisible(true);
    setIsInitialized(true);
  }, 100); // 100ms 지연으로 초기화 충돌 방지
  }, [setActiveTab, setIsGNBVisible]);

  return isInitialized;
};
