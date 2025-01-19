import type { FormData } from "@/types/formdata";
import { PostType } from "@/types/PostType";
import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "./insertPost";

// postId 받으면 인자로 받으면 해당 데이터 가져오는 함수
export const getPost = async (postId: string): Promise<PostType | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, users(nickname), images(img_url)`)
    .eq('id', postId)
    .single();

  if (error) {
    throw new Error("post by ID 패칭 실패");
  }

  return data as PostType;
};

export const getCurrentUserId = async () => {
    const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user?.id;
};


export const updatePostById = async (
  postId: string,
  updatedData: Partial<FormData> // 업데이트할 데이터
): Promise<boolean> => {
  const supabase = createClient();
  try {
    const [si, gu, dong] = updatedData.address ? updatedData.address.split(' ') : [];

    // 1. `posts` 테이블 업데이트
    const { error: postError } = await supabase
      .from('posts')
      .update({
        title: updatedData.title,
        category: updatedData.category,
        date: updatedData.date,
        end_date: updatedData.end_date,
        content: updatedData.content,
        si: si,
        gu: gu,
        dong: dong,
      })
      .eq('id', postId);

    if (postError) {
      console.error('Error updating post:', postError);
      return false;
    }

    // 2. 이미지 처리
    // 2-1. 삭제된 이미지 처리
    for (const imageUrl of updatedData.deletedImages || []) {
      await deleteImageFromPost(postId, imageUrl);
    }

    // 2-2. 새 이미지 업로드 및 `images` 테이블 삽입
    const newImages = updatedData.images?.filter((img) => img instanceof File) as File[];
    for (const file of newImages) {
      const imageUrl = await uploadImage(file, 'images_bucket'); // Storage에 업로드

      const { error: insertError } = await supabase
        .from('images')
        .insert({
          post_id: postId,
          img_url: imageUrl,
        });

      if (insertError) {
        console.error('Error inserting new image to database:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in updatePostById:', error);
    return false;
  }
};



// Supabase Storage와 Images 테이블에서 이미지를 삭제하는 함수
export const deleteImageFromPost = async (postId: string, imageUrl: string): Promise<void> => {
  const supabase = createClient();
  try {
    const filePath = imageUrl.replace(/.*images\//, ''); // Storage에서 삭제할 파일 경로 추출

    // 1. Storage에서 파일 삭제
    const { error: storageError } = await supabase.storage.from('images_bucket').remove([filePath]);
    if (storageError) {
      console.error('Error deleting file from storage:', storageError);
      throw storageError;
    }

    // 2. Images 테이블에서 레코드 삭제
    const { error: dbError } = await supabase
      .from('images')
      .delete()
      .eq('post_id', postId)
      .eq('img_url', imageUrl);

    if (dbError) {
      console.error('Error deleting image from database:', dbError);
      throw dbError;
    }

  } catch (error) {
    console.error('Error in deleteImageFromPost:', error);
    throw error;
  }
};

// completed(모집완료 여부) 업데이트 함수(토글처럼 사용)
export const updateCompleted = async (postId: string): Promise<boolean> => {
  const supabase = createClient();

  try {
    const { data, error: fetchError } = await supabase
      .from("posts") 
      .select("completed")
      .eq("id", postId)
      .single();

    if (fetchError || !data) {
      console.error("completed 값 가져오기 실패:", fetchError);
      return false;
    }

    // 가져온 completed 값과 반대로
    const newCompleted = !data.completed;

    const { error: updateError } = await supabase
      .from("posts")
      .update({ completed: newCompleted })
      .eq("id", postId);

    if (updateError) {
      console.error("completed 값 업데이트 실패:", updateError);
      return false;
    }
    return true;
  } catch (error) {
    console.error("completed 값 토글 중 에러 발생:", error);
    return false;
  }
};
