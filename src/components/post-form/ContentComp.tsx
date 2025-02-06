interface ContentTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentComp = ({ value, onChange }: ContentTextareaProps) => {
  return (
    <div>
      <div className="flex items-center">
        <label htmlFor="content" className="block text-lg font-semibold tracking-[-0.5px]">
          본문
        </label>
        <span className="ml-3 text-sm font-light text-[#595d61]">*500자 이내</span>
      </div>
      <textarea
        id="content"
        name="content"
        value={value}
        placeholder={`필요한 준비물이나 유의사항을 적어주세요.
    ex) 봉사 시 강도가 높아 무거운 물건을 드는데 자신 있는 분을 찾습니다.`}
        rows={4}
        maxLength={500}
        className="focus:border-primary-3 mt-3 block w-full whitespace-pre-line rounded-[8px] border border-[#A1A6AA] px-3 py-[10px] text-base leading-6 placeholder-[#868C92] shadow-sm focus:border-[1.4px] focus:outline-none"
        onChange={onChange}
      />
    </div>
  );
};

export default ContentComp;
