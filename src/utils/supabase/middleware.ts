import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers
      }
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request
            });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          }
        }
      }
    );

    const {
      data: { user }
    } = await supabase.auth.getUser();
    // 현재 비 로그인 상태이면서 경로가 /my-page 경우 홈화면으로 리다이렉트
    if (!user && request.nextUrl.pathname.startsWith('/my-page')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }

    // 현재 로그인 상태이면서 경로가 /login 경우 홈화면으로 리다이렉트
    if (user && request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }

    // 현재 로그인 상태이면서 경로가 /sign-up 인 경우 홈화면으로 리다이렉트
    if (user && request.nextUrl.pathname.startsWith('/sign-up')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }

    // 로그인한 유저정보 리스폰스헤더에 추가
    if (user) {
        const encodedUserData = Buffer.from(JSON.stringify(user), 'utf-8').toString('base64');
        response.headers.set('x-user-data', encodedUserData);
      }
  
    return response;
  } catch (e) {
    console.error('Middleware error:', e);

    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};
