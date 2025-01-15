'use client';

import { BottomSheet } from '@/components/common/BottomSheet';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';
import type { FormData } from '@/types/formdata';
import dayjs from 'dayjs'

interface DateCompProps {
  onSelectRange: (range: [Date, Date]) => void;
  formData: FormData;
}

const DateComp = ({ onSelectRange, formData }: DateCompProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

    // formData 값을 기반으로 selectedRange 초기화
    useEffect(() => {
      if (formData.date && formData.end_date) {
        setSelectedRange([
          new Date(formData.date), // 문자열을 실제 Date 객체로 변환
          new Date(formData.end_date),
        ]);
      }
    }, [formData.date, formData.end_date]);

  const handleOpen = () => setIsSheetOpen(true);
  const handleClose = () => setIsSheetOpen(false);

  const handleRangeSelect = (range: Date | Date[]) => {
    if (Array.isArray(range) && range.length === 2) {
      const [startDate, endDate] = range;

      const formattedStart = dayjs(startDate).format('YYYY-MM-DD');
      const formattedEnd = dayjs(endDate).format('YYYY-MM-DD');

      onSelectRange(range as [Date, Date]); // 부모에 선택된 범위 전달

      // FormData 업데이트
      formData.date = formattedStart;
      formData.end_date = formattedEnd;

      setSelectedRange(range as [Date, Date]);
      setIsSheetOpen(false);
    } else {
      setSelectedRange(null);
    }
  };

  // 날짜 범위를 포맷하여 텍스트로 변환
  const formatRange = (date?: string, end_date?: string): string => {
    if (!date || !end_date) return '';
    return `${dayjs(date).format('YYYY-MM-DD')} ~ ${dayjs(end_date).format('YYYY-MM-DD')}`;
  };


  return (
    <div className="relative">
      <input
        type="text"
        value={formatRange(formData.date, formData.end_date)}
        placeholder="기간을 선택하세요"
        onClick={handleOpen}
        readOnly
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
              formatDay={(locale, date) => `${dayjs(date).date()}`}
              calendarType="hebrew"
              className="custom-calendar w-full"
            />
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
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
