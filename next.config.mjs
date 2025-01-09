/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 프로토콜
        hostname: 'encrypted-tbn0.gstatic.com', // 도메인
        port: '', // 포트는 기본값 사용 (빈 문자열로 지정)
        pathname: '/images/**' // 이미지 경로 (와일드카드 ** 사용)
      },
      {
        protocol: 'https',
        hostname: 'yjweufyemzuoxwzcuzgf.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

export default nextConfig;
