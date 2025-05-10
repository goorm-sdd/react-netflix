import React from 'react';
import { useParams } from 'react-router-dom';
import GridMovie from '../../components/GridBox/GridMovie';
import GridTV from '../../components/GridBox/GridTV';
import './Genre.css';

const Genre = () => {
  const { mediaType, genreName } = useParams();

  return (
    <div className="genre_page">
      <div className="grid_container">
        {mediaType === 'movies' ? (
          <GridMovie genreName={genreName} />
        ) : (
          <GridTV genreName={genreName} />
        )}
      </div>
    </div>
  );
};

export default Genre;
