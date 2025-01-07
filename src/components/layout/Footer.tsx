const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t hidden sm:block">
      {/* 푸터 컨텐츠 */}
      <div className="max-w-content mx-auto flex justify-between text-sm text-gray-600 min-h-[100px]">
        {/* 왼쪽 로고 */}
        <div className="text-xl font-bold text-black">ON:SON</div>

        {/* 중앙 정보 */}
        <div className="flex flex-row">
          <div className="flex flex-col space-y-2 mr-12">
            <div>
              <span className="font-semibold">대표진</span> 김진실, 김문식, 서한솔, 이경민, 한다영
            </div>
            <div>
              <span className="font-semibold">주소</span> 서울특별시 강남구 테헤란로 44길 8 12층
            </div>
            <div>
              <span className="font-semibold">사업자등록번호</span> 783-86-01715
            </div>
          </div>

          {/* 오른쪽 정보 */}
          <div className="flex flex-col space-y-2 text-right">
            <div>
              <span className="font-semibold">EMAIL</span> 1j5p@onson.dev
            </div>
            <div>
              <span className="font-semibold">TEL</span> 02-1522-8016
            </div>
            <div>
              <span className="font-semibold">FAX</span> 02-1522-8016
            </div>

            <div className="text-gray-500 text-xs mt-4">© 2025 ONSON All Right Reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
