import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../services/api';
import { requests } from '../../services/requests';
import DetailModal from '../DetailModal/DetailModal';

const GridContent = () => {
  const { mediaType, genreName } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
    setIsOpen(true);
  };

  const lastItemElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
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
          .map((item) => ({
            ...item,
            media_type: type,
          }));

        setItems((prevItems) => {
          const uniqueItems = newItems.filter(
            (item) => !prevItems.some((i) => i.id === item.id),
          );
          return [...prevItems, ...uniqueItems];
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [mediaType, genreName, page]);

  return (
    <>
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      {items.map((item, index) => {
        if (item.poster_path && index === items.length - 1) {
          return (
            <div ref={lastItemElementRef} key={item.id} className="grid_item">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() => openModal(item.id, item.media_type)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        } else if (item.poster_path) {
          return (
            <div key={item.id} className="grid_item">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() => openModal(item.id, item.media_type)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        }
        return null;
      })}
      {loading && <div>Loading...</div>}
    </>
  );
};

export default GridContent;
