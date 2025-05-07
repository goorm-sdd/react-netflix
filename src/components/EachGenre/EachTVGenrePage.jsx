import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';

const EachTVGenrePage = () => {
  const { genreName } = useParams();
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

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

        switch (genreName) {
          case 'action-adventure':
            request = `${requests.fetchActionAdventureTV}&page=${page}`;
            break;
          case 'comedy':
            request = `${requests.fetchComedyTV}&page=${page}`;
            break;
          case 'documentary':
            request = `${requests.fetchDocumentaryTV}&page=${page}`;
            break;
          case 'drama':
            request = `${requests.fetchDramaTV}&page=${page}`;
            break;
          case 'reality':
            request = `${requests.fetchRealityTV}&page=${page}`;
            break;
          default:
            return;
        }

        const response = await instance.get(request);
        setTVShows((prevTVShows) => [...prevTVShows, ...response.data.results]);
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
              />
            </div>
          );
        } else if (tvShow.poster_path) {
          return (
            <div key={tvShow.id} className="grid-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
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
