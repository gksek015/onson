import onson from '@/assets/onson-loading.png';
import Image from 'next/image';

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4">
      <div className="animate-custom">
        <Image src={onson} alt="onson" />
      </div>
      <div className="text-xl font-medium">로딩중 ...</div>
    </div>
  );
};
