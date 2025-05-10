import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../services/api';
import { requests } from '../../services/requests';
import DetailModal from '../DetailModal/DetailModal';

const GridMovie = () => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
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

  const lastMovieElementRef = useCallback(
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
    setMovies([]);
    setPage(1);
  }, [genreName]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let request;
        let mediaType;

        switch (genreName) {
          case 'netflix-originals':
            request = `${requests.fetchNetflixOriginals}&page=${page}`;
            mediaType = 'movie';
            break;
          case 'action':
            request = `${requests.fetchActionMovies}&page=${page}`;
            mediaType = 'movie';
            break;
          case 'comedy':
            request = `${requests.fetchComedyMovies}&page=${page}`;
            mediaType = 'movie';
            break;
          case 'horror':
            request = `${requests.fetchHorrorMovies}&page=${page}`;
            mediaType = 'movie';
            break;
          case 'romance':
            request = `${requests.fetchRomanceMovies}&page=${page}`;
            mediaType = 'movie';
            break;
          default:
            return;
        }

        const response = await instance.get(request);
        const newMovies = response.data.results
          .filter((movie) => movie.poster_path)
          .map((item) => ({
            ...item,
            media_type: mediaType,
          }));
        setMovies((prevMovies) => {
          const uniqueMovies = newMovies.filter(
            (movie) => !prevMovies.some((m) => m.id === movie.id),
          );
          return [...prevMovies, ...uniqueMovies];
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreName, page]);

  return (
    <>
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      {movies.map((movie, index) => {
        if (movie.poster_path && index === movies.length - 1) {
          return (
            <div ref={lastMovieElementRef} key={movie.id} className="grid_item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onClick={() => openModal(movie.id, movie.media_type)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        } else if (movie.poster_path) {
          return (
            <div key={movie.id} className="grid_item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onClick={() => openModal(movie.id, movie.media_type)}
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

export default GridMovie;
