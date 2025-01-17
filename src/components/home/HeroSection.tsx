import Image from 'next/image';
import banner from '@/assets/banner.png';

const HeroSection = () => {
  return (
      <div>
        <Image src={banner} alt="hero section image"  />
      </div>
     
  );
};

export default HeroSection;
