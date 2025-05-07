import React from 'react';
import './ComingSoon.css';
import { useMovieData } from '../../hooks/useMovieData';
import { requests } from '../../api/requests';
import MovieCard from './MovieCard';

export default function ComingSoon() {
  const { data: movies, loading, error } = useMovieData(requests.fetchUpcoming);

  if (loading) return <div className="coming-soon-container">Loading...</div>;
  if (error)
    return (
      <div className="coming-soon-container error">Error loading data</div>
    );

  return (
    <div className="coming-soon-container">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
