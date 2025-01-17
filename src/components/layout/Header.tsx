import Link from 'next/link';
import MyProfileImage from './header-right/MyProfileImage';
import RightSide from './header-right/RightSide';

const Header = () => {
  return (
    <header className="flex justify-center bg-white p-4">
      <div className="flex w-full max-w-content items-center justify-between">
        {/* 로고부분 */}
        <Link href="/" className="text-xl font-bold text-black">
          ON:SON
        </Link>
        <div className="hidden sm:block">
          <RightSide />
        </div>
        <div className="block sm:hidden">
          <MyProfileImage />
        </div>
      </div>
    </header>
  );
};

export default Header;
