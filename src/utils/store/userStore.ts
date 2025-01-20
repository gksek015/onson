'use client'; // 클라이언트 전용으로 지정

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

// 세션 스토리지 키
const SESSION_STORAGE_KEY = 'user-store';

export const useUserStore = create<UserState>((set, get) => {
  // 세션 스토리지에서 초기 값 로드
  const storedUser = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_STORAGE_KEY);
  const initialState = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialState,
    setUser: (user: User) => {
      set({ user });
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user)); // 세션 스토리지 저장
    },
    clearUser: () => {
      set({ user: null });
      sessionStorage.removeItem(SESSION_STORAGE_KEY); // 세션 스토리지 제거
    },
    isLoggedIn: () => !!get().user,
  };
});
