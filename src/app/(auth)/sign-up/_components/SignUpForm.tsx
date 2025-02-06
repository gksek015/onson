'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/common/Button';
import AuthInput from '@app/(auth)/_components/AuthInput';

import { Loading } from '@/components/common/Loading';
import { userSignUpSchema } from '@/utils/revalidation/userSchema';
import { useDialogStore } from '@/utils/store/useDialogStore';
import { signup } from '@lib/actions/auth/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

type SignUpFormData = z.infer<typeof userSignUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const { open } = useDialogStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<SignUpFormData>({
    resolver: zodResolver(userSignUpSchema),
    mode: 'onChange'
  });
  const handleInputChange = async (fieldName: keyof SignUpFormData) => {
    // 특정 필드에 대해서만 유효성 검사를 실행
    await trigger(fieldName);
  };
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const signupResult = await signup(formData); // signup 함수 호출

      if (signupResult?.error) {
        // 에러가 있으면 스윗알럿 호출
        await Swal.fire({
          title: '회원가입 실패',
          text: signupResult.error,
          icon: 'error',
          confirmButtonText: '확인'
        });
        setIsLoading(false); // 로딩 상태 해제
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
          if (window.innerWidth < 768) {
            router.push('/login');
          } else {
            router.push('/');
            setTimeout(() => {
              open('loginModal');
            }, 500);
          }
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={`sign_up_wrapper ${isLoading ? 'pointer-events-none opacity-50' : ''} sign_up_wrapper_desk`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="input_title_label">
            아이디
          </label>
          <AuthInput
            type="email"
            id="title"
            placeholder="이메일 형식으로 입력해주세요"
            {...register('email', {
              onChange: () => handleInputChange('email') // 이메일 입력 시 유효성 검사 실행
            })}
            errorMessage={errors.email?.message}
            errorMessageStyle={errors.email?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <label htmlFor="nickname" className="input_title_label mobile:mt-[12px] desktop:mt-[28px]">
            닉네임
          </label>
          <AuthInput
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', {
              onChange: () => handleInputChange('nickname') // 닉네임 입력 시 유효성 검사 실행
            })}
            errorMessage={errors.nickname?.message || '최소 1자 이상 10글자 이하로 작성 가능'}
            errorMessageStyle={errors.nickname?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <label htmlFor="password" className="input_title_label mobile:mt-[12px] desktop:mt-[28px]">
            비밀번호
          </label>
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', {
              onChange: () => handleInputChange('password') // 비밀번호 입력 시 유효성 검사 실행
            })}
            errorMessage={errors.password?.message || '최소 8자 이상, 소문자, 숫자, 특수문자(@$!%*?&^) 포함'}
            errorMessageStyle={errors.password?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <label htmlFor="password_confirm" className="input_title_label mobile:mt-[12px] desktop:mt-[28px]">
            비밀번호 확인
          </label>
          <AuthInput
            type="password"
            id="password_confirm"
            placeholder="비밀번호를 다시 입력해주세요"
            {...register('confirmPassword', {
              onChange: () => handleInputChange('confirmPassword') // 비밀번호 확인 입력 시 유효성 검사 실행
            })}
            errorMessage={errors.confirmPassword?.message}
            errorMessageStyle={errors.confirmPassword?.message ? 'text-red-500' : 'text-[#868C92]'}
          />
          <Button className="btn-pink mt-[45px]" type="submit" label="회원가입" />
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
