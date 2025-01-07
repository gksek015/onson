import { categories } from '@/data/categories';
import PostForm from './_components/PostForm';


const Page = () => {
  return (
    <div className="bg-white min-h-screen">
      <header className="flex justify-between items-center px-4 py-3 border-b">
        <button className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-bold">봉사 요청</h1>
        <button
          type="submit"
          form="PostForm"
          className="text-blue-500 font-semibold"
        >
          등록
        </button>
      </header>

      <main className="p-4">
        <PostForm categories={categories} />
      </main>
    </div>
  );
};

export default Page;
