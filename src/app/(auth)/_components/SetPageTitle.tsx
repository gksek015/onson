'use client';

import { usePageTitleStore } from '@/utils/store/pageTitleStore';
import { useEffect } from 'react';

const SetPageTitle = ({ title }: { title: string }) => {
  const setTitle = usePageTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);

  return null;
};

export default SetPageTitle;
