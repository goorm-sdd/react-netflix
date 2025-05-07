import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';

const EachMovieGenrePage = () => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let request;

        switch (genreName) {
          case 'action':
            request = requests.fetchActionMovies;
            break;
          case 'comedy':
            request = requests.fetchComedyMovies;
            break;
          case 'horror':
            request = requests.fetchHorrorMovies;
            break;
          case 'romance':
            request = requests.fetchRomanceMovies;
            break;
          case 'documentary':
            request = requests.fetchDocumentaries;
            break;
          default:
            return;
        }

        const response = await instance.get(request);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [genreName]);

  return (
    <>
      {movies.map(
        (movie) =>
          movie.poster_path && (
            <div key={movie.id} className="grid-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ),
      )}
    </>
  );
};

export default EachMovieGenrePage;
