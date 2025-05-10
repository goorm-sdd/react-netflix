import { useEffect, useState } from 'react';
import { instance } from '../services/api';
import { requests } from '../services/requests';

export const useContentData = ({
  mediaType = 'all',
  genreName = null,
  page = 1,
  mode = 'multi',
}) => {
  const [movies, setMovies] = useState([]);
  const [tvs, setTVs] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSingle = mode === 'single';

  useEffect(() => {
    if (isSingle) {
      setMovies([]);
      setTVs([]);
    }
  }, [mediaType, genreName, isSingle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (isSingle) {
          let requestUrl = '';
          let type = '';

          if (mediaType === 'movies') {
            type = 'movie';
            switch (genreName) {
              case 'netflix-originals':
                requestUrl = `${requests.fetchNetflixOriginals}&page=${page}`;
                break;
              case 'action':
                requestUrl = `${requests.fetchActionMovies}&page=${page}`;
                break;
              case 'comedy':
                requestUrl = `${requests.fetchComedyMovies}&page=${page}`;
                break;
              case 'horror':
                requestUrl = `${requests.fetchHorrorMovies}&page=${page}`;
                break;
              case 'romance':
                requestUrl = `${requests.fetchRomanceMovies}&page=${page}`;
                break;
              default:
                return;
            }
          } else if (mediaType === 'tv-shows') {
            type = 'tv';
            switch (genreName) {
              case 'action-adventure':
                requestUrl = `${requests.fetchActionAdventureTV}&page=${page}`;
                break;
              case 'comedy':
                requestUrl = `${requests.fetchComedyTV}&page=${page}`;
                break;
              case 'documentary':
                requestUrl = `${requests.fetchDocumentaryTV}&page=${page}`;
                break;
              case 'drama':
                requestUrl = `${requests.fetchDramaTV}&page=${page}`;
                break;
              case 'reality':
                requestUrl = `${requests.fetchRealityTV}&page=${page}`;
                break;
              default:
                return;
            }
          }

          const response = await instance.get(requestUrl);
          const results = response.data.results
            .filter((item) => item.poster_path)
            .map((item) => ({ ...item, media_type: type }));

          if (type === 'movie') {
            setMovies((prev) => [
              ...prev,
              ...results.filter((item) => !prev.some((i) => i.id === item.id)),
            ]);
          } else {
            setTVs((prev) => [
              ...prev,
              ...results.filter((item) => !prev.some((i) => i.id === item.id)),
            ]);
          }
        } else {
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

          if (mediaType === 'movie' || mediaType === 'all') {
            const movieRes = await Promise.all(
              movieRequests.map((url) => instance.get(url)),
            );
            setMovies(movieRes.flatMap((res) => res.data.results || []));
          }

          if (mediaType === 'tv' || mediaType === 'all') {
            const tvRes = await Promise.all(
              tvRequests.map((url) => instance.get(url)),
            );
            setTVs(tvRes.flatMap((res) => res.data.results || []));
          }
        }
      } catch (error) {
        console.error('콘텐츠 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mediaType, genreName, page, mode, isSingle]);

  return { movies, tvs, loading };
};
