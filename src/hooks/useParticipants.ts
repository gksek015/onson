import { fetchParticipants, updateParticipantCheck } from '@/lib/detail/participants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useParticipants = (postId: string) => {
  const queryClient = useQueryClient();
    
  // 참여자 목록 가져오기
  const { data: rawParticipants, isPending, error } = useQuery({
    queryKey: ['participants', postId],
    queryFn: () => fetchParticipants(postId)
  });

    // 체크된 사람이 먼저 오도록 정렬
  const participants = rawParticipants
    ? [...rawParticipants].sort((a, b) => Number(b.isChecked) - Number(a.isChecked))
    : [];

  // 체크박스 업데이트
  const mutation = useMutation({
    mutationFn: updateParticipantCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants', postId] }); // 캐시 무효화 후 다시 가져오기
    }
  });

  const toggleCheck = (participantId: string) => {
    if (!participants) return;
    const participant = participants.find((p) => p.id === participantId);
    if (!participant) return;

    mutation.mutate({ participantId, postId, isChecked: !participant.isChecked });
  };

  return { participants, isPending, error, toggleCheck };
};

export default useParticipants;