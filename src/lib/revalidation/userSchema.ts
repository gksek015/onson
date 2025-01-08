import { z } from 'zod';

export const userSignUpSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력해주세요'),

    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .max(20, '비밀번호는 20자를 초과할 수 없습니다')
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        '비밀번호는 최소 8자 이상이며, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다'
      ),

    confirmPassword: z.string(),

    nickname: z.string().min(1, '사용자 이름은 최소 1자 이상이어야 합니다')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
  });

export const userLoginSchema = z.object({
  email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식을 입력해주세요.').trim(),

  password: z.string().nonempty('비밀번호를 입력해주세요.')
});
