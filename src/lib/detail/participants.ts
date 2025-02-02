import { supabase } from "@/utils/supabase/client";


export interface Participant {
  id: string;
  nickname: string;
  isChecked: boolean;
}

// 사용자가 채팅하기를 눌렀을때 참여자로 자동으로 추가하기 위한 함수
export const insertParticipant = async (postId: string, userId: string) => {

  // 중복 확인
  const { data: existingParticipant, error: checkError } = await supabase
    .from('participant')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  if (checkError) {
    throw new Error('기존 참여자 확인 중 오류 발생');
  }

  if (existingParticipant) {
    return;
  }

  // 참여자 추가
  const { error } = await supabase
    .from('participant')
    .insert([{ post_id: postId, user_id: userId, is_checked: false }]);

  if (error) {
    throw new Error('참여자 추가 중 오류 발생');
  }
};


// 특정 게시글의 참여자 목록을 가져오는 함수 
export const fetchParticipants = async (postId: string): Promise<Participant[]> => {
  const { data, error } = await supabase
    .from('participant')
    .select(`
      user_id,
      is_checked,
      users!participant_user_id_fkey (nickname)
    `)
    .eq('post_id', postId);



  if (error) {
    throw new Error('참여자 목록을 불러오는 중 오류 발생');
  }

  return (data ?? []).map((p: { user_id: string; is_checked: boolean; users: { nickname: string } }) => ({
    id: p.user_id,
    nickname: p.users?.nickname,
    isChecked: p.is_checked
  }));
};

// 특정 사용자의 참여 여부를 업데이트하는 함수 
export const updateParticipantCheck = async ({ participantId, postId, isChecked }: { participantId: string; postId: string; isChecked: boolean }) => {
  const { error } = await supabase
    .from('participant')
    .update({ is_checked: isChecked })
    .eq('user_id', participantId) 
    .eq('post_id', postId);

  if (error) {
    throw new Error('참여 체크 업데이트 실패');
  }
};