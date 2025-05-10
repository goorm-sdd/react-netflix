import React from 'react';
import { useParams } from 'react-router-dom';
import GridContent from '../../components/GridBox/GridContent';
import './Genre.css';

const Genre = () => {
  const { mediaType, genreName } = useParams();

  return (
    <div className="genre_page">
      <div className="grid_container">
        <GridContent mediaType={mediaType} genreName={genreName} />
      </div>
    </div>
  );
};

export default Genre;
