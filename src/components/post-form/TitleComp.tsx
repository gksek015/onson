interface TitleInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const TitleComp = ({ value, onChange }: TitleInputProps) => {
    return (
      <div>
        <div className="flex items-center">
          <label htmlFor="title" className="block text-lg font-semibold tracking-[-0.5px]">
            제목
          </label>
          <span className="px-2 text-sm font-medium text-[#595d61]">* 필수</span>
        </div>
        <input
          type="text"
          id="title"
          name="title"
          value={value}
          placeholder="ex) 어르신 보조, 드로잉 재능기부, 환경 정리 등"
          className="focus:border-primary-3 mt-3 block h-12 w-full rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base tracking-[-0.4px] placeholder-[#868C92] focus:border-[1.4px] focus:outline-none"
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default TitleComp;
  