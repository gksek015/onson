'use client';
import { useState } from 'react';
import { SearchIcon } from '../icons/HomeIcons';

interface Juso {
  sggNm: string; // 구
  emdNm: string; // 동
  siNm: string; // 시
}

interface ApiResponse {
  results: {
    juso: Juso[];
  };
}

const AddressSearch = () => {
  const [keyword, setKeyword] = useState(''); // 검색어 상태
  const [searchResults, setSearchResults] = useState<Juso[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDI1MDEwOTE0NDIxNjExNTM5MzE=&currentPage=1&countPerPage=1000&keyword=${
        keyword
      }&resultType=json`,
      {
        method: 'GET'
      }
    )
      .then((response) => response.json() as Promise<ApiResponse>)
      .then((data) => {
        if (data.results.juso) {
          // 중복 제거
          const uniqueResults = data.results.juso.filter(
            (juso, index, self) =>
              index ===
              self.findIndex(
                (item) => item.siNm === juso.siNm && item.sggNm === juso.sggNm && item.emdNm === juso.emdNm
              ) // 시, 구, 동을 기준으로 중복 체크
          );

          setSearchResults(uniqueResults); // 중복 제거된 데이터를 상태로 설정
        } else {
          setSearchResults([]);
          setError(error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('검색 중 오류가 발생했습니다.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='pl-2 md:p-10'>
      <h1 className="text-2xl md:text-4xl font-semibold mb-6">지역 변경</h1>
      <hr className='py-3'/>


      {/* 검색 입력 필드 */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="'시', '구' 까지 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="rounded-lg border p-3 text-base md:text-2xl mb-3 md:mb-6"
        />
        <button type="submit" onClick={handleSearch} className="cursor-pointer text-base md:text-2xl">
          <SearchIcon />
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading && <p>검색 중...</p>}

      {/* 에러 메시지 */}
      {error && (
        <div className="text-red-600 my-4">
          <p >검색결과가 없습니다.</p>
          <p>서울시 강남구 형태로 입력해주세요.</p>
        </div>
      )}

      {/* 검색 결과 */}
      <ul>
        {searchResults.map((juso, index) => (
          <li key={index} className='m-3 text-base md:text-2xl py-1'>
            {juso.siNm} {juso.sggNm} {juso.emdNm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSearch;
