import Header from '@/app/(auth)/my-page/_components/Header';
import React from 'react';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MyPageLayout;
