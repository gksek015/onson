'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateNickname } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { CameraIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';
import { nicknameSchema } from '@lib/revalidation/userSchema';
import Swal from 'sweetalert2';

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
      await Swal.fire({
        title: '닉네임 변경 완료',
        text: '닉네임이 변경되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });
    } catch (err) {
      // 에러 메시지 처리
      console.error('닉네임 업데이트 중 오류:', err);
      await Swal.fire({
        title: '오류',
        text: '닉네임 업데이트 중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <div className="my_profile_wrapper">
      <div className="flex items-center">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[2px] border-[#ECEDEE]">
          <CameraIcon color="#D1D4D6" width="26" height="26" />
        </div>
        <div className="ml-[8px]">
          <span className="input_title_label">{user?.nickname || '사용자 이름'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nickname" className="input_title_label mt-[24px]">
          닉네임 수정
        </label>
        <AuthInput
          type="text"
          id="nickname"
          placeholder="닉네임을 입력하세요"
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <Button type="submit" className="btn-pink mt-[28px]" label="저장" />
      </form>
    </div>
  );
};

export default ProfileUpdate;
