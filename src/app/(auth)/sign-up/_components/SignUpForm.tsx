'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { signup } from '@lib/actions/auth/action';
import { userSignUpSchema } from '@lib/revalidation/userSchema';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

type SignUpFormData = z.infer<typeof userSignUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(userSignUpSchema)
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const signupResult = await signup(formData); // signup 함수 호출

      if (signupResult?.error) {
        // 에러가 있으면 스윗알럿 호출
        await Swal.fire({
          title: '회원가입 실패',
          text: '이미 사용중인 아이디입니다.',
          icon: 'error',
          confirmButtonText: '확인'
        });
        return;
      }

      // 성공 메시지
      await Swal.fire({
        title: '가입을 환영합니다.',
        text: '온손과 함께 따뜻한 손길을 나눠보세요.',
        icon: 'success',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
    } catch (err) {
      console.error('회원가입 처리 중 오류:', err);
      await Swal.fire({
        title: '오류',
        text: '알 수 없는 문제가 발생했습니다. 다시 시도해주세요.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <div className="sign_up_wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className="input_title_label">
          아이디
        </label>
        <AuthInput
          type="email"
          id="title"
          placeholder="이메일 형식으로 입력해주세요"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <label htmlFor="nickname" className="input_title_label mt-[12px]">
          닉네임
        </label>
        <AuthInput
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <label htmlFor="password" className="input_title_label mt-[12px]">
          비밀번호
        </label>
        <AuthInput
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <label htmlFor="password_confirm" className="input_title_label mt-[12px]">
          비밀번호 확인
        </label>
        <AuthInput
          type="password"
          id="password_confirm"
          placeholder="비밀번호를 다시 입력해주세요"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button className="btn-pink mt-[45px]" type="submit" label="회원가입" />
      </form>
    </div>
  );
};

export default SignUpForm;
