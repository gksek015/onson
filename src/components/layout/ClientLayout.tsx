'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noPaddingPages = ['/sign-up', '/create', '/post-update'];
  const applyPaddingPages = !noPaddingPages.some((page) => pathname.startsWith(page));

  return <main className={`flex-1 ${applyPaddingPages ? 'desktop:pt-[72px]' : ''}`}>{children}</main>;
}
