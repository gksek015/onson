import Link from 'next/link';

const LeftSide = () => {
  return (
    <div className="flex hidden flex-row gap-4 sm:block">
      <Link href="/list" className="px-4 py-2 text-xl font-medium text-black">
        봉사게시판
      </Link>
      <Link href="/create" className="px-4 py-2 text-xl font-medium text-black">
        봉사요청
      </Link>
    </div>
  );
};

export default LeftSide;
