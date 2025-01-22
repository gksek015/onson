import { create } from 'zustand';

interface BottomSheetState {
  activeId: string | null; // 열려 있는 바텀시트의 ID (없으면 null)
  isSheetOpen: boolean; // 하나라도 바텀시트가 열려 있는지 여부
  open: (id: string) => void; // 특정 ID의 바텀시트를 열기
  close: () => void; // 모든 바텀시트를 닫기
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  activeId: null, // 초기 상태는 닫힘
  isSheetOpen: false, // 기본적으로 모든 바텀시트는 닫혀 있음
  open: (id) =>
    set(() => ({
      activeId: id,
      isSheetOpen: true, // 바텀시트가 하나라도 열리면 true
    })),
  close: () =>
    set(() => ({
      activeId: null,
      isSheetOpen: false, // 모든 바텀시트를 닫으면 false
    })),
}));
