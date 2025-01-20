import { updateSession } from '@/utils/supabase/middleware';
import type { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
  return await updateSession(request);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
