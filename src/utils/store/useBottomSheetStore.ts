import { create } from 'zustand';

interface BottomSheetState {
  activeId: string | null; // 열려 있는 바텀시트의 ID (없으면 null)
  open: (id: string) => void; // 특정 ID의 바텀시트를 열기
  close: () => void; // 모든 바텀시트를 닫기
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  activeId: null, // 초기 상태는 닫힘
  open: (id) => set({ activeId: id }), // 특정 ID 활성화
  close: () => set({ activeId: null }), // 비활성화
}));
