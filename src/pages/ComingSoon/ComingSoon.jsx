import React from 'react';
import { useMovieData } from '../../hooks/useMovieData';
import { requests } from '../../services/requests';
import MovieCard from '../../components/MovieCard/MovieCard';
import './ComingSoon.css';

const ComingSoon = () => {
  const { data: movies, loading, error } = useMovieData(requests.fetchUpcoming);

  if (loading) return <div className="coming_soon_container">Loading...</div>;
  if (error)
    return (
      <div className="coming_soon_container error">Error loading data</div>
    );

  return (
    <div className="coming_soon_container">
      <div className="movie_list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default ComingSoon;
