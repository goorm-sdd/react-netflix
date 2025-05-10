import React from 'react';
import { useParams } from 'react-router-dom';
import GridContent from '../../components/GridBox/GridContent';
import './Genre.css';

const Genre = () => {
  const { mediaType, genreName } = useParams();

  return (
    <div className="genre-page">
      <div className="grid-container">
        <GridContent mediaType={mediaType} genreName={genreName} />
      </div>
    </div>
  );
};

export default Genre;
