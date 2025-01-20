import Image from 'next/image';
import banner from '@/assets/Banner-3.png';

const HeroSection = () => {
  return (
      <div>
        <Image src={banner} alt="hero section image"  />
      </div>
     
  );
};

export default HeroSection;
