import Link from 'next/link';
import { HomeDesktopLogoIcon } from '../icons/Icons';

const Footer = () => {
  return (
    <footer className="hidden border-t bg-white px-20 py-10 desktop:block">
      {/* 푸터 컨텐츠 */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center text-sm text-gray-600">
        {/* 중앙 로고 */}
        <div className="mb-6">
          <HomeDesktopLogoIcon />
        </div>

        {/* 정보 컨테이너 */}
        <div className="grid w-full max-w-[802px] grid-cols-2 gap-8 text-sm font-normal text-[#1E1F25]">
          {/* 개발자 정보 (이름 + GitHub) */}
          <div className="flex flex-row items-start gap-6 text-left">
            {/* 제목 그룹 */}
            <div className="flex flex-col">
              <span>개발자</span>
              <span className="mt-2">Team-Github</span>
            </div>

            {/* 내용 그룹 */}
            <div className="flex flex-col">
              <span>김진실, 김문식, 이경민, 이지원, 한다영</span>
              <Link href="https://github.com/gksek015/onson" className="mt-2">
                https://github.com/gksek015/onson
              </Link>
            </div>
          </div>

          {/* 디자이너 정보 (이름 + Team) */}
          <div className="flex flex-row items-start gap-6 text-left">
            {/* 제목 그룹 */}
            <div className="flex w-[50px] flex-col">
              <span>디자이너</span>
              <span className="mt-2">Team</span>
            </div>

            {/* 내용 그룹 */}
            <div className="flex w-[316px] flex-col">
              <span>서한솔</span>
              <span className="mt-2">J공주와 다섯 P쟁이들 (Princess J and the Five P-nuts)</span>
            </div>
          </div>
        </div>

        {/* 하단 저작권 정보 */}
        <div className="mt-6 text-xs text-[#555863]">© 2025 ONSON All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
