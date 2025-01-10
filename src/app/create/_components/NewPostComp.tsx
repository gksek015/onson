import PostForm from '@/components/common/post/PostForm';
import { categories } from '@/data/categories';

const NewPostComp = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-bold">봉사 요청</h1>
        <button type="submit" form="PostForm" className="font-semibold text-blue-500">
          등록
        </button>
      </header>

      <main className="p-4">
        <PostForm categories={categories} />
      </main>
    </div>
  );
};

export default NewPostComp;
