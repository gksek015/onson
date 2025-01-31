import onson from '@/assets/onson-loading.png';
import Image from 'next/image';

export const OnsonLoading = () => {
  return (
    <div className="mb-6 mt-3 flex flex-col items-center justify-center gap-3">
      <div className="animate-custom">
        <Image src={onson} alt="onson" width={50}/>
      </div>
      <div className='font-medium'> 온손이 고민중 ...</div>
    </div>
  );
};
