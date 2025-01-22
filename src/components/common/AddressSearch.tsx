'use client';
import { getAddressFromCoordinates } from '@/lib/location/getAddressFromCoordinates';
import { getCurrentPosition } from '@/lib/location/getCurrentPosition';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MapPinIcon, SearchIcon } from '../icons/Icons';

interface AddressSearchProps {
  onAddressSelect?: (searchKeyword: string) => void; // 부모로 콜백 전달
  option: string;
  onSelect?: (selectedAddress: string) => void;
}

const AddressSearch = ({ onAddressSelect, option, onSelect }: AddressSearchProps) => {
  const [keyword, setKeyword] = useState(''); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState<string[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false); // 현 위치 로딩 상태
  const [error, setError] = useState(''); // 에러 상태
  const router = useRouter();

  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  // 주소 검색 기능
  const handleSearch = async () => {
    if (!keyword.trim()) return;

    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${keyword}`;

    try {
      setLoading(true);
      const res = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`
        }
      });

      const data = await res.json();

      if (data.documents.length > 0) {
        const results = data.documents.map((doc: { address_name: string }) => doc.address_name);
        setSearchResults(results);
      } else {
        setSearchResults(['조건에 맞는 위치가 없습니다']);
      }
    } catch (error) {
      console.error('주소 검색 실패:', error);
      setSearchResults(['검색 중 오류가 발생했습니다.']);
    } finally {
      setLoading(false);
    }
  };

  // 현재 위치 가져오기
  const handleGetCurrentLocation = async () => {
    try {
      setGeoLoading(true);
      setError('');

      const position = await getCurrentPosition();
      const address = await getAddressFromCoordinates(position.lat, position.lng, apiKey!);

      setSearchResults([address]); // 검색 결과 리스트에 현위치 추가
      setKeyword(address); // 검색 키워드 동기화

    } catch (error) {
      console.error('현재 위치를 가져올 수 없습니다:', error);
      setError('현재 위치를 가져올 수 없습니다.');
    } finally {
      setGeoLoading(false);
    }
  };

  return (
    <div className="p-5 md:p-10">
      <h1 className="mb-6 text-2xl md:text-4xl font-semibold tracking-[-0.55px] leading-7">위치</h1>

      {/* 검색 입력 필드 */}
      <div className="relative flex w-auto items-center gap-2">
        <input
          type="text"
          placeholder="'동' 단위로 입력해주세요.  ex)역삼동"
          value={keyword}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // 엔터 키 동작
          onChange={(e) => setKeyword(e.target.value)}
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

      {/* 현재 내 위치 */}
      <div className="flex justify-center gap-1.5 rounded-lg font-semibold tracking-content bg-[#FFF5EC] px-3 py-2 text-base text-[#FB657E]">
        <MapPinIcon color="#FB657E" />
        <button onClick={handleGetCurrentLocation} disabled={geoLoading}>
          {geoLoading ? '불러오는 중...' : '현재 내 위치 입력하기'}
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading && <p>검색 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 주소 검색 || 현위치 검색 결과 */}
      <ul className='flex flex-col gap-2 px-3 py-5 overflow-y-scroll text-[#3C4043]'>
        {searchResults.map((juso, index) => (
          <li
            key={index}
            className="py-2.5 text-base font-semibold cursor-pointer tracking-content md:text-2xl"
            onClick={() => {
              // 검색하는 기능은 'search' / 새글 작성 시 선택하는 기능에서는 'select'로 따로 option줘서 onClick 분리하기
              const addressList = juso.split(' ');
              const searchKeyword = `${addressList[2]}`;
              if (option === 'search') {
                // 부모 콜백 호출 및 router.push
                router.push(
                  `/list?address=${addressList[0]}_${addressList[1]}_${addressList[2]}&addressKeyword=${searchKeyword}`
                );
                if (onAddressSelect) {
                  onAddressSelect(searchKeyword);
                }
              }
              if (option === 'select') {
                if (onSelect) {
                  onSelect(`${addressList[0]} ${addressList[1]} ${addressList[2]}`);
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
