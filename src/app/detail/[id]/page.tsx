import Header from './_components/Header';
import PostDetail from './_components/PostDetail';

// 상세페이지
interface PostDetailProps {
  params: { id: string };
}

const PostDetailPage = ({ params }: PostDetailProps) => {
  const { id } = params; // URL에서 id 가져오기
  return (
    <div className="w-full">
      <div className="block md:hidden">
        <Header postPageId={id} />
      </div>
      <PostDetail postPageId={id} />
    </div>
  );
};

export default PostDetailPage;
