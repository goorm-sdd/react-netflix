import { useState, useEffect } from 'react';
import { instance } from '../api/axios';

export const useMovieData = (fetchUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // 컴포넌트 언마운트 시 API 호출 취소
    const fetchData = async () => {
      setLoading(true); // fetchUrl 변경 시 로딩 상태 리셋
      try {
        const response = await instance.get(fetchUrl);
        if (isMounted) {
          setData(response.data.results);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그 설정
    };
  }, [fetchUrl]); // fetchUrl이 변경될 때마다 API를 다시 호출

  return { data, loading, error };
};
