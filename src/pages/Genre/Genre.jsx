import React from 'react';
import { useParams } from 'react-router-dom';
import EachMovieGenrePage from '../../components/EachGenre/EachMovieGenrePage';
import EachTVGenrePage from '../../components/EachGenre/EachTVGenrePage';
import './Genre.css';

const Genre = () => {
  const { mediaType, genreName } = useParams();

  return (
    <div className="genre-page">
      <div className="grid-container">
        {mediaType === 'movies' ? (
          <EachMovieGenrePage genreName={genreName} />
        ) : (
          <EachTVGenrePage genreName={genreName} />
        )}
      </div>
    </div>
  );
};

export default Genre;
