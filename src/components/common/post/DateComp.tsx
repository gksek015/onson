'use client';

import { useState } from 'react';
import { BottomSheet } from '@/components/common/BottomSheet';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

interface DateCompProps {
  onSelectRange: (range: [Date, Date] | null) => void;
}

const DateComp = ({ onSelectRange }: DateCompProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleRangeSelect = (range: Date | Date[]) => {
    if (Array.isArray(range) && range.length === 2) {
      setSelectedRange(range as [Date, Date]);
      onSelectRange(range as [Date, Date]);
      setIsOpen(false);
    } else {
      setSelectedRange(null);
    }
  };

  const formatRange = (range: [Date, Date] | null): string => {
    if (!range) return '기간을 선택하세요';
    const [start, end] = range;
    return `${start.toLocaleDateString('ko-KR')} ~ ${end.toLocaleDateString('ko-KR')}`;
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={formatRange(selectedRange)}
        placeholder="기간을 선택하세요"
        readOnly
        onClick={handleOpen}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isOpen} onClose={handleClose}>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4 text-center">봉사 기간을 선택해 주세요</h3>
          <div className="flex justify-center">
            <Calendar
              selectRange
              onChange={(value) => handleRangeSelect(value as Date | Date[])}
              value={selectedRange}
              locale="ko-KR"
              formatDay={(locale, date) => `${date.getDate()}`}
              calendarType="hebrew"
              className="custom-calendar w-full"
            />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleClose}
              className="bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-300"
            >
              선택하기
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default DateComp;
