import Link from 'next/link';
import ProfileDropdawn from './ProfileDropdown';

const RightSide = () => {
  return (
    <div className="flex flex-row gap-4">
      <Link
        href="/login"
        className="text-black  
      border border-black rounded-full px-4 py-2 hover:bg-blue-200"
      >
        봉사요청
      </Link>

      <Link
        href="/list"
        className="text-black  
      border border-black rounded-full px-4 py-2 hover:bg-blue-200"
      >
        봉사찾기
      </Link>

      <ProfileDropdawn />
    </div>
  );
};

export default RightSide;
