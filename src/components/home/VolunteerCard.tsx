import Image from 'next/image';
import React from 'react';
import oldman from './oldman.jpg';
import oldman2 from './oldman2.jpg';

const VolunteerCard = () => {
  return (
    <div className="flex items-center pt-3">
      <div className="max-w-content mx-auto p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="p-5 border-b">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-gray-400 text-white text-xs rounded-full">유기견 봉사</span>
              <span className="px-3 py-1 bg-gray-400 text-white text-xs rounded-full">25.01.02~25.02.09</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">[인천광역시 남동구] 연탄 봉사, 연초 정기 봉사자 구합니다</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-4">이지원</span>
              <span>25.01.02</span>
            </div>
            <div className="md:w-1/2 flex flex-col items-center w-64 mt-6">
              <Image src={oldman} alt='photo' className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;
