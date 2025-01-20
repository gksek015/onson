import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      screens: {
        mobile: '320px', // => @media (min-width: 320px) { ... }
        tablet: '768px', // => @media (min-width: 768px) { ... }
        desktop: '1025px' // => @media (min-width: 1025px) { ... }
      },
      maxWidth: {
        content: '1440px' //"max-w-content
      },
      boxShadow: {
        'input': '0px 4px 14px 0px rgba(0, 0, 0, 0.05)',
      },
      letterSpacing: {
        'custom': '-0.252px', // 커스텀 값 추가
      }
    }
  },
  plugins: []
};
export default config;
