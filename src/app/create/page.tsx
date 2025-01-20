import NewPostComp from '@app/create/_components/NewPostComp';
import type { Metadata } from 'next';

export const metadata: Metadata= {
  title: '게시글 등록',
  description: '봉사를 요청하세요!'
};

const Page = () => {
  return (
    <NewPostComp/>
  )
};

export default Page;
