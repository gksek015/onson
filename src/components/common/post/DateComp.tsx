'use client';

import { BottomSheet } from '@/components/common/BottomSheet';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

interface DateCompProps {
  onSelectRange: (range: [Date, Date]) => void;
}

const DateComp = ({ onSelectRange }: DateCompProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const handleOpen = () => setIsSheetOpen(true);
  const handleClose = () => setIsSheetOpen(false);

  const handleRangeSelect = (range: Date | Date[]) => {
    if (Array.isArray(range) && range.length === 2) {
      setSelectedRange(range as [Date, Date]);
      onSelectRange(range as [Date, Date]);
      setIsSheetOpen(false);
    } else {
      setSelectedRange(null);
    }
  };

  // dayjs 라이브러리
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
        className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      {/* 바텀시트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={handleClose}>
        <div className="p-4">
          <h3 className="mb-4 text-center text-lg font-medium">봉사 기간을 선택해 주세요</h3>
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
          <div className="mt-4 text-center">
            <button
            type='button'
              onClick={handleClose}
              className="rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-600 hover:bg-gray-300"
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
