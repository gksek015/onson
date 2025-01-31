'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateNicknameAndImage } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { CameraIcon } from '@/components/icons/Icons';
import { nicknameSchema } from '@/utils/revalidation/userSchema';
import { useUserStore } from '@/utils/store/userStore';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

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

  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profileImage || null);
  const [useDefaultImage, setUseDefaultImage] = useState(false); // 체크박스 상태 관리
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string); // 로컬 미리보기 URL 설정
      };
      reader.readAsDataURL(file);
    }
    setUseDefaultImage(false); // 파일 선택 시 기본 이미지 체크 해제
  };

  const onSubmit: SubmitHandler<NicknameFormData> = async (data) => {
    try {
      const formData = new FormData();

      // 닉네임 추가
      formData.append('nickname', data.nickname);

      // 이미지 추가 또는 기본 이미지 사용 설정
      let previewImageUrl = previewUrl; // 선택한 파일의 미리보기 URL
      if (useDefaultImage) {
        formData.append('profileImage', ''); // 기본 이미지로 설정
        previewImageUrl = null;
      } else if (fileInputRef.current?.files?.[0]) {
        const selectedFile = fileInputRef.current.files[0];
        formData.append('profileImage', selectedFile);

        // 로컬 미리보기 URL 업데이트
        previewImageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(previewImageUrl);
      }

      // 서버 액션 호출 및 결과 받기
      const result = await updateNicknameAndImage(formData);

      // 닉네임 및 이미지 업데이트 후 상태 반영
      if (user) {
        setUser({
          ...user,
          nickname: result.nickname,
          profileImage: useDefaultImage ? null : result.profileImageUrl || previewImageUrl
        });
      }
      // Supabase 사용자 메타데이터 업데이트
      const { error } = await supabase.auth.updateUser({
        data: {
          nickname: result.nickname,
          profileImage: useDefaultImage ? null : result.profileImageUrl
        }
      });

      if (error) {
        console.error('user_metadata 업데이트 오류:', error.message);
        throw new Error('user_metadata 업데이트에 실패했습니다.');
      }
      await Swal.fire({
        title: '프로필 업데이트 완료',
        text: '닉네임과 프로필 이미지가 성공적으로 변경되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });
    } catch (err) {
      console.error('프로필 업데이트 중 오류:', err);
      await Swal.fire({
        title: '오류',
        text: '프로필 업데이트 중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <div className="my_profile_wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          {/* 동그라미 프로필 이미지 나오는곳 */}
          <label
            htmlFor="photo-upload"
            className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-[2px] border-[#ECEDEE]"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="미리보기"
                className="h-full w-full rounded-full object-cover"
                width={52}
                height={52}
              />
            ) : (
              <CameraIcon color="#D1D4D6" width="26" height="26" />
            )}
          </label>
          {/* 프로필 이미지 실제 인풋 */}
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <div className="ml-[8px] flex flex-col">
            <span className="text-lg font-bold text-[#242628]">{user?.nickname || '사용자 이름'}</span>
            <div className="flex items-center gap-[4px]">
              {/* 기본 이미지로 변경하는 체크박스 */}
              <input
                type="checkbox"
                id="use-default-image"
                checked={useDefaultImage}
                onChange={(e) => {
                  setUseDefaultImage(e.target.checked);
                  if (e.target.checked) setPreviewUrl(null); // 기본 이미지 사용 시 미리보기 URL 제거
                }}
              />
              <label htmlFor="use-default-image" className="cursor-pointer text-sm text-[#868C92]">
                기본 이미지 사용
              </label>
            </div>
          </div>
        </div>

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
