import Image from 'next/image';
import React from 'react';

const VolunteerCard = () => {
  return (
    <div className="flex items-center pt-10">
      <div className="w-[1440px] mx-auto p-6 rounded-lg">
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
            <div className="bg-slate-400 md:w-1/3 flex flex-col items-center">
              <Image fill sizes="96px" className="object-cover rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;
