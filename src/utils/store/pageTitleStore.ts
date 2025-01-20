'use client';

import { create } from 'zustand';

type PageTitleState = {
  title: string;
  setTitle: (title: string) => void;
};

export const usePageTitleStore = create<PageTitleState>((set) => ({
  title: '기본 제목',
  setTitle: (title: string) => set({ title }),
}));
