'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../post-form/customCalendar.css'
import { ModalSheet } from '@/components/common/ModalSheet';
import { useDialogStore } from '@/utils/store/useDialogStore';

interface DateSelectorProps {
  onSelectRange: (range: [Date, Date]) => void; // 선택한 날짜 범위 부모에 전달
}

const DateSelector = ({ onSelectRange }: DateSelectorProps) => {
  const { open, close } = useDialogStore();
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  // 날짜 범위 선택 시 호출
  const handleRangeSelect = (range: Date | Date[]) => {
    if (Array.isArray(range) && range.length === 2) {
      onSelectRange(range as [Date, Date]); // 부모 컴포넌트로 전달
      setSelectedRange(range as [Date, Date]); // 상태 업데이트
      close(); // 날짜 선택 후 바텀시트 닫기
    }
  };

  return (
    <div>
      {/* 날짜 선택 버튼 */}
      <button
        onClick={() => open('sheetC')}
        className="focus:border-primary-3 h-12 w-full rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base tracking-[-0.4px] placeholder-[#868C92] focus:border-[1.4px] focus:outline-none"
      >
        📅 봉사 날짜를 선택하세요
      </button>

      {/* 바텀시트 (캘린더) */}
      <ModalSheet id="sheetC" title="봉사 날짜를 선택해 주세요">
        <div className="flex h-full flex-col">
          <div className="flex-grow overflow-y-auto px-5 pb-[150px] desktop:pb-0">
            <p className="mb-3 text-base font-semibold text-[#222227]">날짜 선택</p>
            <div className="flex justify-center border-t border-[#BEBEBE]">
              <Calendar
                selectRange
                onChange={(value) => handleRangeSelect(value as Date | Date[])}
                value={selectedRange}
                locale="ko-KR"
                formatDay={(locale, date) => `${dayjs(date).date()}`}
                calendarType="hebrew"
                minDate={new Date()}
                className="custom-calendar w-full"
              />
            </div>
          </div>

          {/* 선택된 날짜 확인 및 닫기 버튼 */}
          <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-between rounded-t-md border-t border-gray-200 bg-white px-5 py-6">
            <div className="flex flex-col">
              <p className="text-xs font-normal text-[#333]">봉사 날짜</p>
              {selectedRange && (
                <p className="text-base font-semibold text-[#333]">
                  {`${dayjs(selectedRange[0]).format('YY.MM.DD.')} ~ ${dayjs(selectedRange[1]).format('YY.MM.DD.')}`}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              className="bg-primary-3 w-28 rounded-[8px] px-4 py-3 font-semibold text-[#FFF]"
            >
              선택하기
            </button>
          </div>
        </div>
      </ModalSheet>
    </div>
  );
};

export default DateSelector;
