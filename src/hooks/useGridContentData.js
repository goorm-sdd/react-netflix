import { useEffect, useState } from 'react';
import { instance } from '../services/api';
import { requests } from '../services/requests';

export const useGridContentData = (mediaType, genreName, page) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems([]);
  }, [mediaType, genreName]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

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
        const newItems = response.data.results
          .filter((item) => item.poster_path)
          .map((item) => ({ ...item, media_type: type }));

        setItems((prevItems) => {
          const uniqueItems = newItems.filter(
            (item) => !prevItems.some((i) => i.id === item.id),
          );
          return [...prevItems, ...uniqueItems];
        });
      } catch (error) {
        console.error('콘텐츠 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [mediaType, genreName, page]);

  return { items, loading };
};
