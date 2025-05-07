import React from 'react';
import { useParams } from 'react-router-dom';
import EachMovieGenrePage from '../../components/EachGenre/EachMovieGenrePage';
import EachTVGenrePage from '../../components/EachGenre/EachTVGenrePage';
import './Genre.css';

const Genre = () => {
  const { mediaType } = useParams();

  return (
    <div className="genre-page">
      <div className="grid-container">
        {mediaType === 'movies' ? <EachMovieGenrePage /> : <EachTVGenrePage />}
      </div>
    </div>
  );
};

export default Genre;
