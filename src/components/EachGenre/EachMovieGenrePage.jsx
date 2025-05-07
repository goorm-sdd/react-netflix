import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';

const EachMovieGenrePage = () => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

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
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let request;

        switch (genreName) {
          case 'action':
            request = `${requests.fetchActionMovies}&page=${page}`;
            break;
          case 'comedy':
            request = `${requests.fetchComedyMovies}&page=${page}`;
            break;
          case 'horror':
            request = `${requests.fetchHorrorMovies}&page=${page}`;
            break;
          case 'romance':
            request = `${requests.fetchRomanceMovies}&page=${page}`;
            break;
          case 'documentary':
            request = `${requests.fetchDocumentaries}&page=${page}`;
            break;
          default:
            return;
        }

        const response = await instance.get(request);
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
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
      {movies.map((movie, index) => {
        if (movie.poster_path && index === movies.length - 1) {
          return (
            <div ref={lastMovieElementRef} key={movie.id} className="grid-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          );
        } else if (movie.poster_path) {
          return (
            <div key={movie.id} className="grid-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
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

export default EachMovieGenrePage;
