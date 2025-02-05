import { create } from 'zustand';

// 다른 사용자 닉네임 및 ID 상태 관리 스토어
interface User {
  id: string | null;
  nickname: string | null;
  profileImage: string | null;
}

interface NicknameState {
  user: User;
  setUser: (user: User) => void;
  getUser: () => User;
}

// 세션 스토리지 키
const SESSION_KEY = "nicknameStoreUser";

// 세션 스토리지에서 사용자 정보 가져오기 (서버에서는 실행되지 않도록)
const getSessionUser = (): User => {
  if (typeof window !== "undefined") { // 클라이언트 환경에서만 실행
    const storedUser = sessionStorage.getItem(SESSION_KEY);
    return storedUser ? JSON.parse(storedUser) : { id: null, nickname: null, profileImage: null };
  }
  return { id: null, nickname: null, profileImage: null }; // 서버 환경에서는 기본값 반환
};

export const useNicknameStore = create<NicknameState>((set, get) => ({
  user: getSessionUser(),

  // setUser: 한 번에 user 정보 설정 + 세션 스토리지 저장
  setUser: (user) => {
    if (typeof window !== "undefined") { // 클라이언트 환경에서만 실행
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
    set({ user });
  },

  // getUser: user 정보 가져오기
  getUser: () => get().user,
}));
