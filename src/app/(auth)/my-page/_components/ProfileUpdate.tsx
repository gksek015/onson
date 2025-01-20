'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateNickname } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { useUserStore } from '@/utils/store/userStore';
import { nicknameSchema } from '@lib/revalidation/userSchema';

// 닉네임 유효성 검사 스키마
type NicknameFormData = z.infer<typeof nicknameSchema>;

const ProfileUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema)
  });

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<NicknameFormData> = async (data) => {
    try {
      // FormData 생성 및 닉네임 추가
      const formData = new FormData();
      formData.append('nickname', data.nickname);

      // 서버 액션 호출
      await updateNickname(formData);

      // 닉네임 변경 후 상태 업데이트
      if (user) {
        setUser({ ...user, nickname: data.nickname });
      }
      alert('닉네임이 변경되었습니다.');
    } catch (err) {
      // 에러 메시지 처리
      console.error('닉네임 업데이트 중 오류:', err);
      alert('닉네임 업데이트 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col px-4 py-6">
      <div className="mb-4 flex items-center">
        <div className="h-[52px] w-[52px] rounded-full border-[2px] border-[#ECEDEE]"></div>
        <div className="ml-4">
          <span className="text-lg font-bold">{user?.nickname || '사용자 이름'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p>닉네임 수정</p>
        <AuthInput
          type="text"
          placeholder="닉네임을 입력하세요"
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <Button type="submit" className="btn-gray w-full" label="저장" />
      </form>
    </div>
  );
};

export default ProfileUpdate;
