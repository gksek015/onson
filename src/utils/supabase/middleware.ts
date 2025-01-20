import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
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
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      }
    );

    // 유저 정보 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 로그아웃 상태 확인
    const isLoggedOut = !user;

    // 로그아웃 상태라면 헤더에서 사용자 데이터 제거
    if (isLoggedOut) {
      response.headers.delete('x-user-data');
    } else {
      // 로그인 상태라면 사용자 데이터를 헤더에 추가
      const encodedUserData = Buffer.from(JSON.stringify(user), 'utf-8').toString('base64');
      response.headers.set('x-user-data', encodedUserData);
    }

    // 특정 경로에서의 리다이렉트 처리
    const pathname = request.nextUrl.pathname;
    if (isLoggedOut && pathname.startsWith('/my-page')) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }
    if (!isLoggedOut && (pathname.startsWith('/login') || pathname.startsWith('/sign-up'))) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
