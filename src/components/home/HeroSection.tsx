import Image from 'next/image';
import onson from './onson.jpg';

const HeroSection = () => {
  return (
    <div className='flex items-end justify-evenly my-4 py-7'>
      <div>
        <Image src={onson} alt="" className='w-32' />
      </div>
      <div>
        <h1 className="text-2xl md:text-4xl">반가워요!</h1>
        <h2>온손이와 함께</h2>
        <h2>봉사를 시작해볼까요?</h2>
      </div>
    </div>
  );
};

export default HeroSection;
