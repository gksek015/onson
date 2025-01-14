import type { FormData } from "@/types/formdata";
import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "./insertPost";

export const getPost = async (postId: string) => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, images(img_url)`)
    .eq('id', postId)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data
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

    console.log('Post updated successfully:', postId);

    // 2. 이미지 처리
    // 2-1. 삭제된 이미지 처리
    for (const imageUrl of updatedData.deletedImages || []) {
      console.log('Deleting image:', imageUrl);
      await deleteImageFromPost(postId, imageUrl);
    }

    // 2-2. 새 이미지 업로드 및 `images` 테이블 삽입
    const newImages = updatedData.images?.filter((img) => img instanceof File) as File[];
    for (const file of newImages) {
      const imageUrl = await uploadImage(file, 'images_bucket'); // Storage에 업로드
      console.log('Uploading new image:', file.name);

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

    console.log('Images updated successfully for post:', postId);
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
    console.log(`Deleting file from storage: ${filePath}`);

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

    console.log(`Successfully deleted image: ${imageUrl}`);
  } catch (error) {
    console.error('Error in deleteImageFromPost:', error);
    throw error;
  }
};