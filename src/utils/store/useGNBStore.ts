import { useEffect, useState } from "react";
import { create } from "zustand";

interface GNBState {
  activeTab: 'home' | 'create' | 'list' | 'chat' | null;  // ✅ 기본값을 'null'로 설정
  isGNBVisible: boolean;
  setActiveTab: (tab: 'home' | 'create' | 'list' | 'chat') => void;
  setIsGNBVisible: (isVisible: boolean) => void;
}

// Zustand Store 생성
export const useGNBStore = create<GNBState>((set) => ({
  activeTab: null, // ✅ 처음엔 `null`, 이후 sessionStorage에서 불러옴
  isGNBVisible: true,
  setActiveTab: (tab) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("activeTab", tab);
    }
    set({ activeTab: tab });
  },
  setIsGNBVisible: (isVisible) => set({ isGNBVisible: isVisible }),
}));

// 클라이언트에서 sessionStorage 값을 업데이트하는 Hook
export const useSyncGNBStore = () => {
  const setActiveTab = useGNBStore((state) => state.setActiveTab);
  const setIsGNBVisible = useGNBStore((state) => state.setIsGNBVisible);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTab = sessionStorage.getItem("activeTab") as 'home' | 'create' | 'list' | 'chat' | null;
      if (storedTab) {
        setActiveTab(storedTab);
      } else {
        setActiveTab('home'); // ✅ 기본값을 'home'으로 설정하지만, sessionStorage 값이 있으면 덮어씌움
      }
      setIsGNBVisible(true);
      setIsInitialized(true); // ✅ 초기화 완료
    }
  }, [setActiveTab, setIsGNBVisible]);

  return isInitialized;
};
