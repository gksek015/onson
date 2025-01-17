// 수퍼베이스에서 created_at에서 날짜만 뽑고 싶은 경우 이 함수 사용

export const createdAtDate = (datetime: string): string => {
  return new Date(datetime).toISOString().split('T')[0];
};