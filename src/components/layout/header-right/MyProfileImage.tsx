'use client';

import { MyProfileIcon } from '@/components/icons/Icons';
import { useUserStore } from '@/utils/store/userStore';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const MyProfileImage = () => {
  const { user } = useUserStore(); // 로그인 상태 확인
  const router = useRouter();

  const handleProfileClick = async () => {
    if (!user) {
      // SweetAlert2를 이용한 로그인 여부 확인
      const result = await Swal.fire({
        title: '로그인이 필요합니다.',
        text: '로그인 페이지로 이동하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인',
        cancelButtonText: '취소'
      });

      if (result.isConfirmed) {
        router.push('/login'); // 로그인 페이지로 이동
      }
    } else {
      router.push('/my-page'); // 마이페이지로 이동
    }
  };
  return (
    <button onClick={handleProfileClick} className="p-2">
      <MyProfileIcon />
    </button>
  );
};

export default MyProfileImage;
