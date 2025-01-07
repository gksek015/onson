'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const SignUpPage = () => {
  const [testData, setTestData] = useState<Database['public']['Tables']['posts']['Row'][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const supabase: SupabaseClient<Database> = createClient();

        const { data, error } = await supabase.from('posts').select('*');

        if (error) throw error;
        setTestData(data);
      } catch (err) {
        console.error('Supabase 연결 오류:', err instanceof Error ? err.message : String(err));
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      }
    };

    testSupabaseConnection();
  }, []);

  return (
    <div>
      <h1>회원가입</h1>
      <p>Supabase 연결 테스트 결과:</p>
      {error ? (
        <p style={{ color: 'red' }}>에러 발생: {error}</p>
      ) : testData ? (
        <pre>{JSON.stringify(testData, null, 2)}</pre>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </div>
  );
};

export default SignUpPage;
