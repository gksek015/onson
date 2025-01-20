import UpdatePostComp from "@app/post-update/_components/UpdatePostComp"
import type { Metadata } from "next";

export const metadata: Metadata= {
  title: '게시글 수정',
  description: '게시글을 수정할 수 있습니다.'
};

const page = () => {
  return (
    <UpdatePostComp/>
  )
}

export default page