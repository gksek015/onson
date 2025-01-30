import Link from 'next/link';

const RightSide = () => {
  return (
    <div className="flex flex-row gap-4">
      <Link href="/login" className="rounded-full border border-black px-4 py-2 text-black hover:bg-blue-200">
        봉사요청
      </Link>

      <Link href="/list" className="rounded-full border border-black px-4 py-2 text-black hover:bg-blue-200">
        봉사게시판
      </Link>
    </div>
  );
};

export default RightSide;
