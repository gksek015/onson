import { supabase } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import type { FormData } from '@/types/formdata';

// 게시물 데이터를 Supabase Posts 테이블에 삽입하는 함수
export const insertPost = async (formData: FormData, userId: string): Promise<{ id: string }> => {
  try {

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        date: formData.date,
        address: formData.address,
        user_id: userId,
        completed: false,
      })
      .select()
      .single();

    if (error) throw error;

    return { id: post.id };
  } catch (error) {
    console.error('Error inserting post:', error);
    throw error;
  }
};

// 이미지를 Supabase Storage에 업로드하고 URL을 반환하는 함수
export const uploadImage = async (image: File, bucketName: string): Promise<string> => {
  try {
    const filename = `${uuidv4()}.${image.name.split('.').pop()}`;

    const { error: uploadError } = await supabase.storage.from(bucketName).upload(filename, image);

    if (uploadError) {
      console.error('Image upload error:', uploadError.message);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filename);

    if (!publicUrlData) {
      throw new Error('Unable to fetch public URL for the uploaded image.');
    }

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// 게시물 ID와 이미지 URL을 Supabase Images 테이블에 삽입하는 함수
export const insertImageToPost = async (postId: string, imageUrl: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('images')
      .insert({
        post_id: postId,
        img_url: imageUrl,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error inserting image to post:', error);
    throw error;
  }
};