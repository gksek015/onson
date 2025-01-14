import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string | null;
};

type UserState = {
  user: User | null; // 로그인한 사용자 정보
  setUser: (user: User) => void; // 사용자 정보 설정
  clearUser: () => void; // 사용자 정보 초기화
  isLoggedIn: () => boolean; // 로그인 여부 확인
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => {set({ user: null })},
  isLoggedIn: () => !!get().user
}));
