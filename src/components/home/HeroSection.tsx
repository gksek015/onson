import Image from 'next/image';
import onson from '@/assets/onson.jpg';

const HeroSection = () => {
  return (
    <div className="flex items-end justify-evenly my-6 py-9 bg-[#f7f7f7]">
      <div>
        <Image src={onson} alt="" className="w-32" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl">반가워요!</h1>
        <h2>온손이와 함께</h2>
        <h2>봉사를 시작해볼까요?</h2>
      </div>
    </div>
  );
};

export default HeroSection;
