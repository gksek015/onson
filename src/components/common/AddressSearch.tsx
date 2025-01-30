'use client';

import { JSON_DATA } from '@/app/constants/restructured_administrative_data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchIcon } from '../icons/Icons';

interface AddressSearchProps {
  onAddressSelect?: (searchKeyword: string) => void; // 부모로 콜백 전달
  option: string;
  onSelect?: (selectedAddress: string) => void;
}

const AddressSearch = ({ onAddressSelect, option, onSelect }: AddressSearchProps) => {
  const [keyword, setKeyword] = useState(''); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState<string[]>([]); // 검색 결과 상태
  const [error, setError] = useState(''); // 에러 상태
  const router = useRouter();

  const handleSearch = () => {
    const searchKeyword = keyword.trim();

    if (!searchKeyword) {
      setError('검색어를 입력해주세요.');
      setSearchResults([]); // 빈 검색어일 경우 결과를 초기화
      return;
    }

    const searchTokens = searchKeyword.split(' '); // 띄어쓰기로 검색어 분리
    const results: string[] = [];

    // JSON_DATA에서 검색
    JSON_DATA.forEach((city) => {
      const cityName = city.siNm; // ex) 서울특별시

      city.gu.forEach((gu) => {
        const guName = gu.guNm; // ex) 강남구

        // 구 단위로 검색어와 매칭 확인
        const guFullAddress = `${cityName} ${guName}`;
        const isGuMatching = searchTokens.every(
          (token) => cityName.includes(token) || guName.toString().includes(token)
        );

        if (isGuMatching) {
          // "서울특별시 강남구"와 같은 구 단위 결과 추가
          results.push(guFullAddress);
        }

        // 동 단위로 검색어와 매칭 확인
        gu.dong.forEach((dongName) => {
          const fullAddress = `${guFullAddress} ${dongName}`; // "서울특별시 강남구 역삼동" 형식 생성
          const isDongMatching = searchTokens.every(
            (token) => cityName.includes(token) || guName.toString().includes(token) || dongName.includes(token)
          );

          if (isDongMatching) {
            results.push(fullAddress);
          }
        });
      });
    });

    // 결과 업데이트
    if (results.length > 0) {
      setSearchResults(results);
      setError('');
    } else {
      setSearchResults([]);
      setError('검색 결과가 없습니다.');
    }
  };

    // 입력창 변경 시 처리 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setKeyword(value);
  
      if (value.trim() === '') {
        // 검색어가 비어있으면 결과를 초기화
        setSearchResults([]);
      }
    };

  return (
    <div className="flex h-full flex-grow flex-col overflow-y-auto p-5 md:p-10">
      <h1 className="mb-6 text-2xl font-semibold leading-7 tracking-[-0.55px] md:text-4xl">위치</h1>

      {/* 검색 입력 필드 */}
      <div className="relative flex w-auto items-center gap-2">
        <input
          type="text"
          placeholder="원하는 지역이나 동네를 검색해주세요"
          value={keyword}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()} // 엔터 키 동작
          onChange={handleInputChange}
          className="my-4 w-full flex-1 cursor-pointer rounded-full border border-[#FB657E] p-0.5 px-5 py-3.5 text-base text-black shadow-input focus:outline-none md:mb-6 md:text-2xl"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4b4b4b] md:text-4xl"
        >
          <span className="sr-only">Search</span>
          <SearchIcon />{' '}
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 주소 검색 || 현위치 검색 결과 */}
      <ul className="flex flex-col gap-2 overflow-y-scroll px-3 py-5 text-[#3C4043]">
        {searchResults.map((juso, index) => (
          <li
            key={index}
            className="cursor-pointer py-2.5 text-base font-semibold tracking-content md:text-2xl"
            onClick={() => {
              // 검색하는 기능은 'search' / 새글 작성 시 선택하는 기능에서는 'select'로 따로 option줘서 onClick 분리하기
              const addressList = juso.split(' ');
              const searchKeyword = addressList.length > 2 ? addressList[2] : addressList[1];

              if (option === 'search') {
                // 부모 콜백 호출 및 router.push
                const queryAddress =
                  addressList.length > 2
                    ? `${addressList[0]}_${addressList[1]}_${addressList[2]}`
                    : `${addressList[0]}_${addressList[1]}`;

                router.push(`/list?address=${queryAddress}&addressKeyword=${searchKeyword}`);

                if (onAddressSelect) {
                  onAddressSelect(searchKeyword);
                }
              }
              if (option === 'select') {
                if (onSelect) {
                  onSelect(juso);
                }
              }
            }}
          >
            {juso}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSearch;

