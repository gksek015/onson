import { categories } from '@/data/categories';
import PostForm from '@/components/common/post/PostForm';

const NewPostComp = () => {


    return (
        <div className="bg-white min-h-screen">
          <header className="flex justify-between items-center px-4 py-3 border-b">
            <h1 className="text-lg font-bold">봉사 요청</h1>
            <button type="submit" form="PostForm" className="text-blue-500 font-semibold">
              등록
            </button>
          </header>
    
          <main className="p-4">
            <PostForm categories={categories} />
          </main>
        </div>
      );
}

export default NewPostComp