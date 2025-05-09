import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';
import DetailModal from '../DetailModal/DetailModal';

const EachTVGenrePage = () => {
  const { genreName } = useParams();
  const [tvShows, setTVShows] = useState([]);
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

  const lastTVShowElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  useEffect(() => {
    setTVShows([]);
    setPage(1);
  }, [genreName]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        let request;
        let mediaType;

        switch (genreName) {
          case 'action-adventure':
            request = `${requests.fetchActionAdventureTV}&page=${page}`;
            mediaType = 'tv';
            break;
          case 'comedy':
            request = `${requests.fetchComedyTV}&page=${page}`;
            mediaType = 'tv';
            break;
          case 'documentary':
            request = `${requests.fetchDocumentaryTV}&page=${page}`;
            mediaType = 'tv';
            break;
          case 'drama':
            request = `${requests.fetchDramaTV}&page=${page}`;
            mediaType = 'tv';
            break;
          case 'reality':
            request = `${requests.fetchRealityTV}&page=${page}`;
            mediaType = 'tv';
            break;
          default:
            return;
        }

        const response = await instance.get(request);
        const newTVShows = response.data.results
          .filter((tvShow) => tvShow.poster_path)
          .map((item) => ({
            ...item,
            media_type: mediaType,
          }));
        setTVShows((prevTVShows) => {
          const uniqueTVShows = newTVShows.filter(
            (tvShow) => !prevTVShows.some((t) => t.id === tvShow.id),
          );
          return [...prevTVShows, ...uniqueTVShows];
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [genreName, page]);

  return (
    <>
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      {tvShows.map((tvShow, index) => {
        if (tvShow.poster_path && index === tvShows.length - 1) {
          return (
            <div
              ref={lastTVShowElementRef}
              key={tvShow.id}
              className="grid-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                onClick={() => openModal(tvShow.id, tvShow.media_type)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        } else if (tvShow.poster_path) {
          return (
            <div key={tvShow.id} className="grid-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                onClick={() => openModal(tvShow.id, tvShow.media_type)}
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

export default EachTVGenrePage;
