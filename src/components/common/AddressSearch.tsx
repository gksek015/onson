'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GrSearch } from 'react-icons/gr';

export interface Juso {
  sggNm: string; // 구
  emdNm: string; // 동
  siNm: string; // 시
}

interface ApiResponse {
  results: {
    juso: Juso[];
  };
}

interface AddressSearchProps {
  onAddressSelect?: (searchKeyword: string) => void; // 부모로 콜백 전달
  option: string;
}

const AddressSearch = ({ onAddressSelect, option }: AddressSearchProps) => {
  const [keyword, setKeyword] = useState(''); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState<Juso[]>([]); // 검색 결과 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDI1MDEwOTE0NDIxNjExNTM5MzE=&currentPage=1&countPerPage=1000&keyword=${keyword}&resultType=json`,
      {
        method: 'GET'
      }
    )
      .then((response) => response.json() as Promise<ApiResponse>)
      .then((data) => {
        if (data.results.juso) {
          const uniqueResults = data.results.juso.filter(
            (juso, index, self) =>
              index ===
              self.findIndex(
                (item) => item.siNm === juso.siNm && item.sggNm === juso.sggNm && item.emdNm === juso.emdNm
              )
          );
          setSearchResults(uniqueResults);
        } else {
          setSearchResults([]);
          setError('검색 결과가 없습니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('검색 중 오류가 발생했습니다.');
      })
      .finally(() => setLoading(false));
  }, [keyword, setError, setSearchResults]);

  return (
    <div className="pl-2 md:p-10">
      <h1 className="mb-6 text-2xl font-semibold md:text-4xl">지역 변경</h1>
      <hr className="py-3" />

      {/* 검색 입력 필드 */}
      <div className="relative flex w-auto items-center gap-2">
        <input
          type="text"
          placeholder="'시', '구'까지 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full rounded-lg border p-3 text-base md:mb-6 md:text-2xl"
        />
        <button type="submit" className="absolute right-2 cursor-pointer text-xl text-gray-500 md:text-4xl">
          <span className="sr-only">Search</span>
          <GrSearch />
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading && <p>검색 중...</p>}

      {/* 에러 메시지 */}
      {error && (
        <div className="my-4 text-red-600">
          <p>{error}</p>
          <p>서울시 강남구 형태로 입력해주세요.</p>
        </div>
      )}

      {/* 검색 결과 */}
      <ul>
        {searchResults.map((juso, index) => (
          <li
            key={index}
            className="m-3 py-1 text-base md:text-2xl"
            onClick={() => {
              // 검색하는 기능은 'search'로 새글 작성 시 선택하는 기능에서는 'select'로 따로 option줘서 onClick 분리하기
              if (option === 'search') {
                const searchKeyword = `${juso.emdNm}`;
                // 부모 콜백 호출 및 router.push
                router.push(`/list?address=${juso.siNm}_${juso.sggNm}_${juso.emdNm}&addressKeyword=${searchKeyword}`);
                if (onAddressSelect) {
                  onAddressSelect(searchKeyword);
                }
              }
            }}
          >
            {juso.siNm} {juso.sggNm} {juso.emdNm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSearch;
