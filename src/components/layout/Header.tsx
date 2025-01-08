import Link from 'next/link';
import RightSide from './header-right/RightSide';

const Header = () => {
  return (
    <header className="flex justify-center bg-white shadow-md p-4">
      <div className="max-w-content w-full flex justify-between items-center">
        {/* 로고부분 */}
        <Link href="/" className="text-xl font-bold text-black">
          ON:SON
        </Link>
        <div className="hidden sm:block">
          <RightSide />
        </div>
      </div>
    </header>
  );
};

export default Header;
