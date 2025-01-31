import { create } from 'zustand';

interface DialogState {
  activeId: string | null; // 현재 열려 있는 다이얼로그 ID (모달 or 바텀시트)
  isOpen: boolean; // 다이얼로그(모달/바텀시트) 열려 있는지 여부
  open: (id: string) => void; // 특정 ID 다이얼로그 열기
  close: () => void; // 모든 다이얼로그 닫기
}

export const useDialogStore = create<DialogState>((set) => ({
  activeId: null, // 초기 상태는 닫힘
  isOpen: false, // 기본적으로 모든 다이얼로그 닫힘
  open: (id) => set({ activeId: id, isOpen: true }), // 특정 ID 열기
  close: () => set({ activeId: null, isOpen: false }), // 닫기
}));
