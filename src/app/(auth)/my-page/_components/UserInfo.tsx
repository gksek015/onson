'use client';

import { useUserStore } from '@/utils/store/userStore';

const UserInfo = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <p>로그인되지 않았습니다.</p>;
  }

  return (
    <div>
      <h1>사용자 정보</h1>
      <p>아이디: {user.id}</p>
      <p>이메일: {user.email}</p>
      <p>닉네임: {user.nickname}</p>
    </div>
  );
};

export default UserInfo;
