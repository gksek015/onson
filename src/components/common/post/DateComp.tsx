'use client';

import { BottomSheet } from '@/components/common/BottomSheet';
import type { FormData } from '@/types/formdata';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';
import { useBottomSheetStore } from '@/utils/store/useBottomSheetStore';

interface DateCompProps {
  onSelectRange: (range: [Date, Date]) => void;
  formData: FormData;
}

const DateComp = ({ onSelectRange, formData }: DateCompProps) => {
    const { open, close } = useBottomSheetStore();
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  // formData 값을 기반으로 selectedRange 초기화
  useEffect(() => {
    if (formData.date && formData.end_date) {
      setSelectedRange([
        new Date(formData.date), // 문자열을 실제 Date 객체로 변환
        new Date(formData.end_date)
      ]);
    }
  }, [formData.date, formData.end_date]);


  const handleRangeSelect = (range: Date | Date[]) => {
    if (Array.isArray(range) && range.length === 2) {
      const [startDate, endDate] = range;

      const formattedStart = dayjs(startDate).format('YY.MM.DD.');
      const formattedEnd = dayjs(endDate).format('YY.MM.DD.');

      onSelectRange(range as [Date, Date]); // 부모에 선택된 범위 전달

      // FormData 업데이트
      formData.date = formattedStart;
      formData.end_date = formattedEnd;

      setSelectedRange(range as [Date, Date]);
    } else {
      setSelectedRange(null);
    }
  };

  // 날짜 범위를 포맷하여 텍스트로 변환
  const formatRange = (date?: string, end_date?: string): string => {
    if (!date || !end_date) return '';
    return `${dayjs(date).format('YY.MM.DD.')} ~ ${dayjs(end_date).format('YY.MM.DD.')}`;
  };

  return (
    <div>
      <input
        type="text"
        value={formatRange(formData.date, formData.end_date)}
        placeholder="기간을 선택하세요"
        onClick={() => open('sheetC')}
        readOnly
        className="tracking-[-0.4px] h-12 w-full rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base placeholder-[#868C92]"
      />

      {/* 바텀시트 */}
      <BottomSheet id='sheetC'>
        <div className="flex h-full flex-col">
          <div className="flex-grow overflow-y-auto px-5 pb-[90px]">
            <h3 className="mb-14 text-left text-2xl font-semibold text-[#000]">
              봉사 날짜를 <br />
              선택해 주세요
            </h3>
            <p className="mb-3 text-base font-semibold text-[#222227]">날짜 선택</p>
            <div className="flex justify-center border-t border-[#BEBEBE]">
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
          </div>

          <div className="bg-white fixed bottom-0 left-0 w-full flex items-center justify-between rounded-t-md border-t border-gray-200 px-5 py-3">
            <div className="flex flex-col">
              <p className="text-xs font-normal text-[#333]">봉사 날짜</p>
              {selectedRange && (
                <p className="text-base font-semibold text-[#333]">
                  {`${dayjs(selectedRange[0]).format('YY.MM.DD.')} ~ ${
                    selectedRange[1] ? dayjs(selectedRange[1]).format('YY.MM.DD.') : ''
                  }`}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              className="bg-primary-3 w-28 rounded-[8px] px-4 py-3 font-semibold text-[#FFF] hover:bg-gray-300"
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
