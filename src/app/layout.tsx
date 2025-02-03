import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import QueryProvider from './QueryProvider';

export const metadata: Metadata = {
  title: 'ON:SON',
  description: 'ON:SON은 누구나 쉽게 봉사활동에 참여하고 모집할 수 있습니다.'
};

const pretendard = localFont({
  src: './font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <title>ON:SON</title>
      </head>
      <body className={pretendard.className}>
        <div>
          <QueryProvider>
            <ToastContainer />
            <Header />
            <main className="flex-1">{children}</main>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
