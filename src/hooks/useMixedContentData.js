import { useEffect, useState } from 'react';
import { instance } from '../api/axios';
import { requests } from '../api/requests';

export const useMixedContentData = (type = 'all') => {
  const [rawMovies, setRawMovies] = useState([]);
  const [rawTVs, setRawTVs] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const movieRequests = [
          requests.fetchNetflixOriginals,
          requests.fetchActionMovies,
          requests.fetchComedyMovies,
          requests.fetchHorrorMovies,
          requests.fetchRomanceMovies,
        ];

        const tvRequests = [
          requests.fetchActionAdventureTV,
          requests.fetchComedyTV,
          requests.fetchDocumentaryTV,
          requests.fetchDramaTV,
          requests.fetchRealityTV,
        ];

        if (type === 'movie' || type === 'all') {
          const movieRes = await Promise.all(
            movieRequests.map((url) => instance.get(url)),
          );
          setRawMovies(movieRes.flatMap((res) => res.data.results || []));
        }

        if (type === 'tv' || type === 'all') {
          const tvRes = await Promise.all(
            tvRequests.map((url) => instance.get(url)),
          );
          setRawTVs(tvRes.flatMap((res) => res.data.results || []));
        }
      } catch (error) {
        console.error('콘텐츠 로딩 실패:', error);
      }
    };

    fetchContent();
  }, [type]);

  return { rawMovies, rawTVs };
};
