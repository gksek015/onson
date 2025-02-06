'use client';

import { CheckBoxFillIcon, CheckBoxStrokeIcon, ParticipantListIcon } from '@/components/icons/Icons';
import useParticipants from '@/hooks/useParticipants';
import { useUserStore } from '@/utils/store/userStore';

interface ParticipantListProps {
  postId: string;
  postOwnerId: string;
}

const ParticipantList = ({ postId, postOwnerId }: ParticipantListProps) => {
  const { user } = useUserStore();
  const { participants, isPending, error, toggleCheck } = useParticipants(postId);

  if (user?.id !== postOwnerId) return null;
  if (isPending) return <p className="text-center">참여자 목록 불러오는 중...</p>;
  if (error) return <p className="text-center text-red-500">참여자 목록을 가져오는 중 오류 발생</p>;

  return (
    <div className="mt-12">
      <div className="flex flex-row items-center gap-[6px]">
        <ParticipantListIcon color='#FB657E'/>
        <h3 className="text-base font-normal text-[#666]">봉사 참여자 (미참여자는 체크해제)</h3>
      </div>

      <ul className="mt-4 grid mobile:grid-cols-2 desktop:grid-cols-3 gap-3 desktop:gap-4">
        {participants?.map((participant) => (
          <li key={participant.id} className="flex items-center gap-[6px]">
            {/* 체크 아이콘 버튼 */}
            <button onClick={() => toggleCheck(participant.id)}>
              {participant.isChecked ? <CheckBoxFillIcon /> : <CheckBoxStrokeIcon />}
            </button>
            {/* 참여자 닉네임 */}
            <span className="text-base font-normal">{participant.nickname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
