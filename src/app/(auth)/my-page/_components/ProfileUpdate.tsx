'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateNicknameAndImage } from '@lib/actions/auth/action';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { Loading } from '@/components/common/Loading';
import { CameraIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';
import { nicknameSchema } from '@lib/revalidation/userSchema';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet-updated';
import Swal from 'sweetalert2';

type NicknameFormData = z.infer<typeof nicknameSchema>;

const ProfileUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema)
  });

  const [isLoading, setIsLoading] = useState(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  console.log('user?.profileImage', user?.profileImage);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profileImage || null);
  const [useDefaultImage, setUseDefaultImage] = useState(false); // 체크박스 상태 관리
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);
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
    closeSheet();
  };

  const onSubmit: SubmitHandler<NicknameFormData> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // 닉네임 추가
      formData.append('nickname', data.nickname);

      // 이미지 추가 또는 기본 이미지 사용 설정
      let previewImageUrl = previewUrl;
      if (useDefaultImage) {
        formData.append('profileImage', '');
        previewImageUrl = null;
      } else if (fileInputRef.current?.files?.[0]) {
        const selectedFile = fileInputRef.current.files[0];
        formData.append('profileImage', selectedFile);
        previewImageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(previewImageUrl);
      }

      // 서버 액션 호출 및 결과 받기
      const result = await updateNicknameAndImage(formData);

      // 에러가 있으면 스윗알럿으로 표시
      if (result?.error) {
        await Swal.fire({
          title: '프로필 업데이트 실패',
          text: result.error, //서버에서 전달된 에러 메시지 출력
          icon: 'error',
          confirmButtonText: '확인'
        });
        setIsLoading(false);
        return;
      }

      // 닉네임 및 이미지 업데이트 후 상태 반영
      if (user) {
        console.log('useDefaultImage', useDefaultImage);
        console.log('result.profileImageUrl', result.profileImageUrl);
        console.log('previewImageUrl', previewImageUrl);
        setUser({
          ...user,
          nickname: result.nickname,
          profileImage: useDefaultImage ? null : result.profileImageUrl || previewImageUrl
        });
      }

      await Swal.fire({
        title: '프로필 업데이트 완료',
        text: '닉네임과 프로필 이미지가 성공적으로 변경되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });

      reset();
      window.location.href = window.location.origin + '/my-page';
    } catch (err) {
      console.error('프로필 업데이트 중 오류:', err);
      await Swal.fire({
        title: '오류',
        text: '프로필 업데이트 중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={`my_profile_wrapper ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            {/* 동그라미 프로필 이미지 나오는곳 */}
            <label
              onClick={openSheet}
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
            errorMessage={errors.nickname?.message || '최소 1자 이상 10글자 이하로 작성 가능'}
            errorMessageStyle={errors.nickname?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <Button type="submit" className="btn-pink mt-[28px]" label="저장" />

          {/* 바텀 시트*/}
          <BottomSheet
            open={isSheetOpen}
            onDismiss={closeSheet}
            snapPoints={({ maxHeight }) => [maxHeight * 0.3, maxHeight * 0.4]} // 스냅 포인트 설정(참고로 첫번째는 처음 열리는 위치, 두번쨰는 사용자가 올릴 수 있는 만큼 올린 위치임)
            defaultSnap={({ maxHeight }) => maxHeight * 0.3} // 기본 열림 위치 설정
          >
            <div className="p-4">
              <button className="flex w-full items-center gap-2 px-4 py-2 text-left">
                <label htmlFor="photo-upload" className="h-full w-full cursor-pointer">
                  사진에서 선택
                </label>
              </button>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                style={{ opacity: 0, width: '1px', height: '1px', position: 'absolute' }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <button
                onClick={() => {
                  setUseDefaultImage(true);
                  setPreviewUrl(null);
                  closeSheet();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-500"
              >
                기본이미지 선택
              </button>
            </div>
          </BottomSheet>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
