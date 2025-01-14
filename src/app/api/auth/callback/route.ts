import { getSupabaseClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const origin = new URL(request.url).origin || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // 기본값 추가
      const code = searchParams.get('code');
      const next = searchParams.get('next') 
        ? new URL(searchParams.get('next')!, origin).toString() 
        : `${origin}/`;
  
      if (!code) {
        return NextResponse.redirect(`${origin}/auth/error`);
      }
  
      const supabase = getSupabaseClient();
      const { data: userData, error } = await supabase.auth.exchangeCodeForSession(code);
  
      if (error) {
        console.error('Error exchanging code:', error);
        return NextResponse.redirect(`${origin}/auth/error`);
      }
  
      await supabase.from('users').insert({
        id: userData.user?.id,
        email: userData.user?.email,
        nickname: userData.user?.user_metadata.name || 'Unknown',
      });
  
      return NextResponse.redirect(next);
    } catch (err) {
      console.error('Unexpected error:', err);
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/auth/error'); // 기본값 사용
    }
  }
  
