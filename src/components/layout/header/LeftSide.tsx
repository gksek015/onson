import Link from 'next/link';

const LeftSide = () => {
  return (
    <div className="flex flex-row gap-4 mobile:hidden desktop:block">
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
